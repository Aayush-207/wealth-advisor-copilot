"use client";
import { useState } from "react";
import Link from "next/link";
import { useStored, initialEscalations, type Escalation } from "@/lib/storage";
import PageHeading from "@/components/PageHeading";
import Icon from "@/components/Icon";
export default function Escalations() {
  const [items, save] = useStored<Escalation[]>(
    "wealthdesk:escalations",
    initialEscalations,
  );
  const [filter, setFilter] = useState("Active");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const filtered = items.filter(
    (x) =>
      filter === "All" ||
      (filter === "Resolved"
        ? x.status === "Resolved"
        : x.status !== "Resolved"),
  );
  function update(item: Escalation, status: string) {
    const note = notes[item.id] ?? item.note;
    if (status === "Resolved" && !note.trim()) return;
    if (
      !save(items.map((i) => (i.id === item.id ? { ...i, status, note } : i)))
    )
      setError(
        "Browser storage is unavailable. The update could not be saved.",
      );
    else setError("");
  }
  return (
    <div className="standard-page">
      <PageHeading
        eyebrow="WHEN CONTEXT CALLS FOR AN EXPERT"
        title="The specialist"
        italic="desk."
        description="Keep unanswered questions visible. Give the next reviewer a clear starting point."
        action={
          <Link href="/" className="secondary-button">
            Back to workspace
            <Icon name="arrow" size={16} />
          </Link>
        }
      />
      <div className="stats-strip">
        <div>
          <strong>
            {String(
              items.filter((x) => x.status !== "Resolved").length,
            ).padStart(2, "0")}
          </strong>
          <span>Open questions</span>
        </div>
        <div>
          <strong>
            {String(
              items.filter((x) => x.status === "Resolved").length,
            ).padStart(2, "0")}
          </strong>
          <span>Resolved in this browser</span>
        </div>
        <div className="stats-note">
          <Icon name="flag" size={24} />
          <span>
            A thoughtful pause
            <br />
            is part of good advice.
          </span>
        </div>
      </div>
      <div className="filter-tabs">
        {["Active", "Resolved", "All"].map((f) => (
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
      <div className="escalation-list">
        {filtered.map((item) => (
          <article className="escalation-card" key={item.id}>
            <div className="escalation-meta">
              <span>
                {item.id} <span className="muted">/ {item.owner}</span>
              </span>
              <div>
                <span
                  className={`pill ${item.priority === "Critical" ? "red" : "amber"}`}
                >
                  {item.priority} priority
                </span>
                <span
                  className={`pill ${item.status === "Resolved" ? "green" : "neutral"}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
            <h2>{item.question}</h2>
            {item.status === "Resolved" ? (
              <div className="resolution-note">
                <span className="eyebrow">REVIEW NOTE</span>
                <p>{item.note}</p>
                <button
                  className="text-button"
                  onClick={() => update(item, "Open")}
                >
                  Reopen question
                  <Icon name="arrow" size={14} />
                </button>
              </div>
            ) : (
              <>
                <label htmlFor={`resolution-${item.id}`}>Specialist note</label>
                <textarea
                  id={`resolution-${item.id}`}
                  rows={3}
                  maxLength={2000}
                  value={notes[item.id] ?? item.note}
                  onChange={(e) =>
                    setNotes({ ...notes, [item.id]: e.target.value })
                  }
                  placeholder="Add your assessment, sources and any follow-up needed…"
                />
                <div className="escalation-actions">
                  <span>Local demo only · No message will be sent</span>
                  <button
                    className="secondary-button"
                    onClick={() => update(item, "In review")}
                  >
                    Save draft
                  </button>
                  <button
                    className="primary-button"
                    disabled={!(notes[item.id] ?? item.note).trim()}
                    onClick={() => update(item, "Resolved")}
                  >
                    <Icon name="check" size={15} />
                    Resolve locally
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <Icon name="check" size={32} />
          <h2>A clear desk.</h2>
          <p>No questions in this view.</p>
        </div>
      )}
      {error && (
        <p role="alert" className="notice">
          {error}
        </p>
      )}
      <p className="page-note">
        This is a local review demonstration. It does not notify a specialist,
        enforce reviewer roles, or provide regulatory approval.
      </p>
    </div>
  );
}
