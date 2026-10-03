"use client";
import { useState } from "react";
import Link from "next/link";
import { documents, type Citation } from "@/lib/knowledge";
import Icon from "@/components/Icon";
import PageHeading from "@/components/PageHeading";
import EvidenceDrawer from "@/components/EvidenceDrawer";
const categories = [
  "All documents",
  "Taxation",
  "Compliance",
  "Investor protection",
  "Operations",
];
export default function Library() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All documents");
  const [sort, setSort] = useState("newest");
  const [citation, setCitation] = useState<Citation | null>(null);
  const filtered = documents
    .filter(
      (d) =>
        (filter === "All documents" || d.category === filter) &&
        `${d.title} ${d.issuer} ${d.summary}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.title.localeCompare(b.title)
        : b.date.localeCompare(a.date),
    );
  return (
    <div className="standard-page">
      <PageHeading
        eyebrow="KNOWLEDGE, WITH PROVENANCE"
        title="The document"
        italic="library."
        description="The original material. The full context. All in one place."
        action={
          <a
            className="secondary-button"
            href="/documents/provenance.json"
            download
          >
            <Icon name="download" size={16} />
            Source manifest
          </a>
        }
      />
      <div className="library-banner">
        <div className="banner-icon">
          <Icon name="book" size={28} />
        </div>
        <div>
          <span className="eyebrow">THE INDIA REFERENCE COLLECTION</span>
          <h2>Open the source. See the whole picture.</h2>
          <p>
            Official publications, preserved as dated snapshots. Review
            applicability before client use.
          </p>
        </div>
        <div className="banner-count">
          <strong>{documents.length}</strong>
          <span>REFERENCE PDFs</span>
        </div>
      </div>
      <div className="library-controls">
        <div className="search-field">
          <Icon name="search" size={18} />
          <input
            aria-label="Search documents"
            placeholder="Search a title, topic or publisher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="icon-button"
              aria-label="Clear document search"
              onClick={() => setSearch("")}
            >
              <Icon name="close" size={14} />
            </button>
          )}
        </div>
        <label className="sort-select">
          Sort by{" "}
          <select
            aria-label="Sort documents"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Publication date</option>
            <option value="name">Title A–Z</option>
          </select>
        </label>
      </div>
      <div className="filter-tabs" aria-label="Document categories">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={filter === c}
            className={filter === c ? "selected" : ""}
            onClick={() => setFilter(c)}
          >
            {c}
            {c === "All documents" && <span>{documents.length}</span>}
          </button>
        ))}
      </div>
      <div className="section-label results-label">
        <span>
          {filtered.length} DOCUMENT{filtered.length === 1 ? "" : "S"}
        </span>
        <span>PUBLIC REFERENCE · BANK REVIEW PENDING</span>
      </div>
      {filtered.length ? (
        <div className="document-grid">
          {filtered.map((d, i) => (
            <article
              className="library-card"
              key={d.id}
              style={{ animationDelay: `${Math.min(i, 5) * 45}ms` }}
            >
              <div className="library-card-top">
                <span
                  className={`doc-icon ${d.category === "Taxation" ? "tax" : ""}`}
                >
                  <Icon name="file" size={24} />
                </span>
                <span className="pill neutral">{d.category}</span>
              </div>
              <span className="document-issuer">{d.issuer}</span>
              <h2>
                <button
                  onClick={() =>
                    setCitation({
                      documentId: d.id,
                      page: 1,
                      section: "Document overview",
                      summary: d.summary,
                    })
                  }
                >
                  {d.shortTitle}
                </button>
              </h2>
              <p>{d.summary}</p>
              <div className="document-details">
                <span>{d.date}</span>
                <span>{d.pages} pages · PDF</span>
              </div>
              <div className="library-card-bottom">
                <button
                  className="text-button"
                  onClick={() =>
                    setCitation({
                      documentId: d.id,
                      page: 1,
                      section: "Document overview",
                      summary: d.summary,
                    })
                  }
                >
                  Read reference
                  <Icon name="arrow" size={15} />
                </button>
                <a
                  href={d.file}
                  download
                  className="icon-button"
                  aria-label={`Download ${d.title}`}
                >
                  <Icon name="download" size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="search" size={35} />
          <h2>No documents found.</h2>
          <p>Try a broader term or another category.</p>
          <button
            className="secondary-button"
            onClick={() => {
              setSearch("");
              setFilter("All documents");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
      <div className="library-disclaimer">
        <Icon name="shield" size={18} />
        <p>
          These are public regulatory and tax references, not an approved bank
          policy set. Historical publications may have later amendments.{" "}
          <Link href="/admin">Review the collection</Link>.
        </p>
      </div>
      <EvidenceDrawer
        key={citation?.documentId ?? "none"}
        citation={citation}
        onClose={() => setCitation(null)}
      />
    </div>
  );
}
