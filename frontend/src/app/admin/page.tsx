"use client";
import { useState } from "react";
import { documents, type Citation } from "@/lib/knowledge";
import { useStored } from "@/lib/storage";
import PageHeading from "@/components/PageHeading";
import Icon from "@/components/Icon";
import EvidenceDrawer from "@/components/EvidenceDrawer";
type Review = { status: "Reviewed in demo" | "Needs follow-up"; note: string };
export default function Admin() {
  const [reviews, save] = useStored<Record<string, Review>>(
    "wealthdesk:reviews",
    {},
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [citation, setCitation] = useState<Citation | null>(null);
  const reviewed = Object.values(reviews).filter(
    (r) => r.status === "Reviewed in demo",
  ).length;
  function update(status: Review["status"]) {
    if (!selected || !note.trim()) return;
    if (save({ ...reviews, [selected]: { status, note: note.trim() } })) {
      setSelected(null);
      setNote("");
      setError("");
    } else
      setError(
        "Browser storage is unavailable. Your review could not be saved.",
      );
  }
  return (
    <div className="standard-page">
      <PageHeading
        eyebrow="GOVERNANCE / REFERENCE REVIEW"
        title="A second"
        italic="perspective."
        description="Inspect the evidence and record what still needs attention."
      />
      <div className="stats-strip">
        <div>
          <strong>
            {String(documents.length - reviewed).padStart(2, "0")}
          </strong>
          <span>Awaiting demo review</span>
        </div>
        <div>
          <strong>{String(reviewed).padStart(2, "0")}</strong>
          <span>Reviewed in this browser</span>
        </div>
        <div>
          <strong>00</strong>
          <span>Bank-approved documents</span>
        </div>
      </div>
      <div className="notice governance-notice">
        <Icon name="shield" size={21} />
        <p>
          <b>A practice review, not a publication workflow.</b> Status changes
          stay on this browser. They do not approve documents for client use or
          change the hardcoded answers.
        </p>
      </div>
      <div className="filter-tabs">
        {["All", "Pending", "Reviewed in demo", "Needs follow-up"].map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            className={filter === f ? "selected" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="review-list">
        {documents
          .filter(
            (d) =>
              filter === "All" ||
              (reviews[d.id]?.status || "Pending") === filter,
          )
          .map((d) => (
            <article className="review-row" key={d.id}>
              <div className="review-summary">
                <span className="doc-icon">
                  <Icon name="file" size={21} />
                </span>
                <div className="review-title">
                  <span className="eyebrow">
                    {d.issuer} / {d.date}
                  </span>
                  <h2>{d.shortTitle}</h2>
                  <p>{reviews[d.id]?.note || d.note}</p>
                </div>
                <span
                  className={`pill ${reviews[d.id]?.status === "Reviewed in demo" ? "green" : "amber"}`}
                >
                  {reviews[d.id]?.status || "Pending"}
                </span>
                <button
                  className="secondary-button"
                  onClick={() => {
                    setSelected(selected === d.id ? null : d.id);
                    setNote(reviews[d.id]?.note || "");
                    setError("");
                  }}
                >
                  Review
                  <Icon name="chevron" size={14} />
                </button>
              </div>
              {selected === d.id && (
                <div className="review-editor">
                  <button
                    className="text-button"
                    onClick={() =>
                      setCitation({
                        documentId: d.id,
                        page: 1,
                        section: "Review the original publication",
                        summary: d.summary,
                      })
                    }
                  >
                    <Icon name="external" size={15} />
                    Open the source before reviewing
                  </button>
                  <label htmlFor={`note-${d.id}`}>
                    Review note <span>(required)</span>
                  </label>
                  <textarea
                    id={`note-${d.id}`}
                    value={note}
                    maxLength={2000}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Record version, scope, amendments to check, and any missing context…"
                    rows={3}
                  />
                  <div className="review-editor-actions">
                    <button
                      className="secondary-button"
                      disabled={!note.trim()}
                      onClick={() => update("Needs follow-up")}
                    >
                      Needs follow-up
                    </button>
                    <button
                      className="primary-button"
                      disabled={!note.trim()}
                      onClick={() => update("Reviewed in demo")}
                    >
                      <Icon name="check" size={16} />
                      Save demo review
                    </button>
                  </div>
                  {error && <p role="alert">{error}</p>}
                </div>
              )}
            </article>
          ))}
      </div>
      {!documents.some(
        (d) =>
          filter === "All" || (reviews[d.id]?.status || "Pending") === filter,
      ) && (
        <div className="empty-state">
          <Icon name="shield" size={30} />
          <h2>No documents in this review state.</h2>
        </div>
      )}
      <EvidenceDrawer
        key={citation?.documentId ?? "none"}
        citation={citation}
        onClose={() => setCitation(null)}
      />
    </div>
  );
}
