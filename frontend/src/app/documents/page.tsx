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
    <div className="standard-page" style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
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
            style={{ fontSize: "12px", padding: "8px 16px", background: "transparent", border: "1px solid #262c3b", color: "#262c3b" }}
          >
            <Icon name="download" size={14} />
            Source manifest
          </a>
        }
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", margin: "60px 0 20px", borderBottom: "1px solid #e6e5df", paddingBottom: "16px" }}>
        
        {/* Search and Filters */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "600px" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#747880" }}>
              <Icon name="search" size={16} />
            </div>
            <input
              aria-label="Search documents"
              placeholder="Search a title, topic or publisher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "10px 10px 10px 36px", 
                background: "transparent", border: "1px solid #e6e5df", 
                fontSize: "14px", color: "#262c3b", outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#6356a4"}
              onBlur={(e) => e.target.style.borderColor = "#e6e5df"}
            />
            {search && (
              <button
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#747880", background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setSearch("")}
              >
                <Icon name="close" size={14} />
              </button>
            )}
          </div>
          
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  background: filter === c ? "#262c3b" : "transparent",
                  color: filter === c ? "#fff" : "#747880",
                  border: filter === c ? "1px solid #262c3b" : "1px solid transparent",
                  padding: "4px 12px",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "color 0.2s"
                }}
                onMouseOver={(e) => { if (filter !== c) e.currentTarget.style.color = "#262c3b" }}
                onMouseOut={(e) => { if (filter !== c) e.currentTarget.style.color = "#747880" }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#747880" }}>Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              background: "transparent", border: "none", fontSize: "13px", color: "#262c3b", cursor: "pointer", outline: "none", borderBottom: "1px solid #262c3b", paddingBottom: "2px"
            }}
          >
            <option value="newest">Publication date</option>
            <option value="name">Title A–Z</option>
          </select>
        </div>

      </div>

      <div style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#747880", marginBottom: "20px" }}>
        {filtered.length} Result{filtered.length === 1 ? "" : "s"} found &mdash; Public Reference
      </div>

      {/* Document List */}
      {filtered.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {filtered.map((d, i) => (
            <div
              key={d.id}
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr 120px 80px",
                gap: "24px",
                alignItems: "center",
                padding: "20px 16px",
                borderBottom: "1px solid #e6e5df",
                transition: "background 0.2s",
                cursor: "pointer"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#f2f0ea"}
              onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
              onClick={() =>
                setCitation({
                  documentId: d.id,
                  page: 1,
                  section: "Document overview",
                  summary: d.summary,
                })
              }
            >
              <div style={{ fontSize: "11px", color: "#747880", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {d.issuer}
                <div style={{ marginTop: "4px", color: "#a19c95" }}>{d.date}</div>
              </div>
              
              <div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: "normal", color: "#262c3b", margin: "0 0 6px 0" }}>
                  {d.shortTitle}
                </h2>
                <p style={{ fontSize: "13px", color: "#747880", margin: 0, lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {d.summary}
                </p>
              </div>

              <div style={{ fontSize: "11px", color: "#747880", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <span style={{ display: "inline-block", border: "1px solid #e6e5df", padding: "2px 8px" }}>
                  {d.category}
                </span>
              </div>
              
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <a
                  href={d.file}
                  download
                  onClick={(e) => e.stopPropagation()}
                  style={{ color: "#747880" }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#262c3b"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#747880"}
                >
                  <Icon name="download" size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: "80px 0", textAlign: "center", color: "#747880" }}>
          <Icon name="search" size={24} />
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: "normal", color: "#262c3b", margin: "16px 0 8px" }}>
            No documents found
          </h2>
          <p style={{ fontSize: "14px" }}>Try adjusting your search or filters.</p>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "60px", paddingTop: "24px", borderTop: "1px solid #e6e5df", fontSize: "11px", color: "#747880" }}>
        <Icon name="shield" size={16} />
        <p style={{ margin: 0 }}>
          These are public regulatory and tax references, not an approved bank policy set. Historical publications may have later amendments.{" "}
          <Link href="/admin" style={{ color: "#262c3b", textDecoration: "underline" }}>Review the collection</Link>.
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
