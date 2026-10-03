"use client";
import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHeading from "@/components/PageHeading";
import { useStored, type SavedQuery } from "@/lib/storage";
const examples: SavedQuery[] = [
  {
    id: "QA-112",
    query: "What is the capital gains tax for equity mutual funds?",
    date: "2026-09-30T14:22:00Z",
    responseId: "tax",
  },
  {
    id: "QA-113",
    query: "Can I transfer an ISA without losing tax wrapper?",
    date: "2026-09-29T09:15:00Z",
    responseId: "unknown",
  },
  {
    id: "QA-114",
    query: "Fee structure for Global Equity Fund Class A",
    date: "2026-09-28T16:45:00Z",
    responseId: "fees",
  },
];
export default function History() {
  const [saved] = useStored<SavedQuery[]>("wealthdesk:history", []);
  const [q, setQ] = useState("");
  const all = [...saved, ...examples].filter((x) =>
    x.query.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="standard-page">
      <PageHeading
        eyebrow="PICK UP THE THREAD"
        title="Considered"
        italic="conversations."
        description="Return to a question, revisit its sources, and keep the context close."
        action={
          <Link href="/?new=1" className="primary-button">
            <Icon name="plus" size={16} />
            New conversation
          </Link>
        }
      />
      <div className="stats-strip">
        <div>
          <strong>{saved.length.toString().padStart(2, "0")}</strong>
          <span>Saved on this browser</span>
        </div>
        <div>
          <strong>03</strong>
          <span>Original example conversations</span>
        </div>
        <div className="stats-note">
          <Icon name="history" size={24} />
          <span>
            Every conversation
            <br />
            has a place to return to.
          </span>
        </div>
      </div>
      <div className="search-field history-search">
        <Icon name="search" size={18} />
        <input
          aria-label="Search conversations"
          placeholder="Find a conversation…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div className="section-label results-label">
        <span>{all.length} CONVERSATIONS</span>
        <span>OPEN TO REVISIT THE SAVED RESPONSE</span>
      </div>
      <div className="history-list">
        {all.map((item) => (
          <Link
            href={`/?q=${encodeURIComponent(item.query)}`}
            className="history-row"
            key={item.id}
          >
            <span className="history-icon">
              <Icon name="chat" size={21} />
            </span>
            <div>
              <div className="history-meta">
                <span>
                  {item.id.startsWith("QA-")
                    ? `${item.id} · EXAMPLE`
                    : "SAVED LOCALLY"}
                </span>
                <span>
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </span>
              </div>
              <h2>{item.query}</h2>
              <p>
                {item.responseId === "tax"
                  ? "Tax framework, worked example and page-linked sources."
                  : item.responseId === "fees"
                    ? "Product identification and missing fee evidence."
                    : "Outside the saved answer collection. Specialist context needed."}
              </p>
            </div>
            <span className="pill neutral">
              {item.responseId === "unknown"
                ? "Needs context"
                : "Saved response"}
            </span>
            <Icon name="arrow" size={19} />
          </Link>
        ))}
      </div>
      {!all.length && (
        <div className="empty-state">
          <Icon name="search" size={30} />
          <h2>No matching conversations.</h2>
          <button className="text-button" onClick={() => setQ("")}>
            Clear search
          </button>
        </div>
      )}
      <p className="page-note">
        New conversations are stored in this browser only. Opening a
        conversation replays the hardcoded response; it does not re-check
        current law.
      </p>
    </div>
  );
}
