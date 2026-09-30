-- Run once in the Supabase SQL editor. Isolated prototype schema; no existing tables changed.
create schema if not exists extensions;
create extension if not exists vector with schema extensions;

create table if not exists public.wd_documents (
 id uuid primary key,
 document_key text not null unique,
 title text not null,
 version text not null,
 category text not null,
 product_id text,
 jurisdiction text not null,
 business_entity text,
 language text not null default 'en',
 source_kind text not null check (source_kind in ('demo','reference')),
 status text not null check (status in ('draft','in_review','active','withdrawn','quarantined','superseded','scheduled','expired','demo_active','demo_superseded','demo_scheduled')),
 approval_status text not null check (approval_status in ('demo_fixture_only','pending_bank_review','bank_approved')),
 bank_owner text,
 bank_approver text,
 approved_at timestamptz,
 source_url text,
 source_publication_date date,
 source_locator text,
 effective_from date,
 effective_to date,
 effective_to_is_open_ended boolean not null default false,
 supersedes_document_key text,
 allowed_roles text[] not null default '{}',
 classification text not null,
 file_path text not null,
 sha256 text not null check (length(sha256)=64),
 retrieved_at timestamptz not null,
 extraction_status text not null,
 review_due date,
 check (effective_to is null or (effective_from is not null and effective_to > effective_from)),
 check (not effective_to_is_open_ended or effective_to is null),
 check (source_kind != 'demo' or approval_status='demo_fixture_only'),
 check (status != 'active' or (
   source_kind='reference' and approval_status='bank_approved'
   and bank_owner is not null and bank_approver is not null and bank_owner<>bank_approver
   and approved_at is not null and effective_from is not null
   and (effective_to is not null or effective_to_is_open_ended)
   and business_entity is not null and review_due is not null
   and cardinality(allowed_roles)>0))
);

create table if not exists public.wd_chunks (
 id uuid primary key,
 document_id uuid not null references public.wd_documents(id),
 chunk_index integer not null,
 section text not null,
 content text not null,
 char_start integer not null,
 char_end integer not null,
 word_count integer not null,
 excerpt_sha256 text not null check(length(excerpt_sha256)=64),
 source_anchor text not null,
 original_source_locator text,
 content_type text not null,
 embedding extensions.vector(768),
 embedding_model text,
 embedding_dimensions integer,
 search_text tsvector generated always as (to_tsvector('english', section || ' ' || content)) stored,
 unique(document_id,chunk_index),
 check(char_start>=0 and char_end>char_start),
 check((embedding is null and embedding_model is null and embedding_dimensions is null)
       or (embedding is not null and embedding_model is not null and embedding_dimensions=768))
);
create index if not exists wd_chunks_search_idx on public.wd_chunks using gin(search_text);
create index if not exists wd_chunks_document_idx on public.wd_chunks(document_id);
-- A vector ANN index is unnecessary for this small corpus. Add and benchmark later.

alter table public.wd_documents enable row level security;
alter table public.wd_chunks enable row level security;
-- No anon/authenticated policies: the browser cannot read raw records or unpublished sources.
revoke all on public.wd_documents,public.wd_chunks from anon,authenticated;
grant select,insert,update on public.wd_documents,public.wd_chunks to service_role;

create or replace function public.wd_immutable_source() returns trigger language plpgsql as $$
begin
 if TG_TABLE_NAME='wd_documents' then
   if NEW.id<>OLD.id or NEW.sha256<>OLD.sha256 or NEW.version<>OLD.version
      or NEW.title<>OLD.title or NEW.file_path<>OLD.file_path then
     raise exception 'Source identity is immutable: insert a new version';
   end if;
 else
   if NEW.document_id<>OLD.document_id or NEW.content<>OLD.content
      or NEW.section<>OLD.section or NEW.source_anchor<>OLD.source_anchor
      or NEW.excerpt_sha256<>OLD.excerpt_sha256 then
     raise exception 'Evidence is immutable: prepare a new source version';
   end if;
 end if;
 return NEW;
end;
$$;
drop trigger if exists wd_document_immutable on public.wd_documents;
create trigger wd_document_immutable before update on public.wd_documents
for each row execute function public.wd_immutable_source();
drop trigger if exists wd_chunk_immutable on public.wd_chunks;
create trigger wd_chunk_immutable before update on public.wd_chunks
for each row execute function public.wd_immutable_source();

-- Backend only. p_role, p_entity and p_demo must come from trusted backend configuration/session.
-- This is corpus filtering, NOT a complete employee authentication/ACL system.
create or replace function public.wd_search(
 p_query text, p_as_of date, p_role text, p_entity text,
 p_jurisdiction text default 'IN', p_product text default null,
 p_demo boolean default false,
 p_embedding extensions.vector(768) default null,
 p_embedding_model text default 'gemini-embedding-2',
 p_limit integer default 6
) returns table(chunk_id uuid, document_id uuid, title text, version text,
 section text, content text, citation text, score double precision)
language sql stable security invoker set search_path=public,extensions as $$
 select c.id,d.id,d.title,d.version,c.section,c.content,c.source_anchor,
 case when p_embedding is null then
   ts_rank_cd(c.search_text,websearch_to_tsquery('english',p_query))::double precision
 else (1-(c.embedding <=> p_embedding))::double precision end as score
 from public.wd_chunks c join public.wd_documents d on d.id=c.document_id
 where d.jurisdiction=p_jurisdiction and d.business_entity=p_entity
 and p_role=any(d.allowed_roles)
 and d.effective_from is not null and d.effective_from<=p_as_of
 and ((d.effective_to_is_open_ended and d.effective_to is null) or p_as_of<d.effective_to)
 and (p_product is null or d.product_id=p_product or d.product_id is null)
 and (
  (p_demo and d.source_kind='demo' and d.status in ('demo_active','demo_superseded'))
  or (not p_demo and d.source_kind='reference' and d.status='active'
      and d.approval_status='bank_approved' and d.approved_at is not null)
 )
 and ((p_embedding is null and c.search_text @@ websearch_to_tsquery('english',p_query))
      or (p_embedding is not null and c.embedding is not null and c.embedding_model=p_embedding_model))
 order by score desc,c.id limit greatest(1,least(p_limit,20));
$$;
revoke all on function public.wd_search(text,date,text,text,text,text,boolean,extensions.vector,text,integer) from public,anon,authenticated;
grant execute on function public.wd_search(text,date,text,text,text,text,boolean,extensions.vector,text,integer) to service_role;
