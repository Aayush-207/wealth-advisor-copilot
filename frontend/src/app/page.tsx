"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon, { Mark } from "@/components/Icon";
import EvidenceDrawer from "@/components/EvidenceDrawer";
import {
  documents,
  prompts,
  matchResponse,
  responseAsText,
  type Response,
  type Citation,
} from "@/lib/knowledge";
import {
  readStored,
  writeStored,
  initialEscalations,
  type SavedQuery,
  type Escalation,
} from "@/lib/storage";
type Turn = {
  id: string;
  query: string;
  response: Response | null;
  stopped?: boolean;
};
function KnowledgeArtwork() {
  return (
    <div className="knowledge-art" aria-hidden="true">
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <span className="orbit-spark">✦</span>
      <div className="art-file rear">
        <span>POLICY & PRACTICE</span>
        <i />
        <i />
        <i />
      </div>
      <div className="art-file front">
        <div className="art-file-top">
          <Mark small />
          <span>
            THE REFERENCE
            <br />
            COLLECTION
          </span>
        </div>
        <div className="art-file-title">
          A source
          <br />
          for every
          <br />
          <em>perspective.</em>
        </div>
        <div className="art-lines">
          <i />
          <i />
        </div>
        <div className="art-file-footer">
          WEALTHDESK / VOL. 01
          <Icon name="arrow" size={17} />
        </div>
      </div>
      <div className="art-seal">
        <Icon name="book" size={19} />
        <span>
          GROUNDED IN
          <br />
          THE SOURCE
        </span>
      </div>
    </div>
  );
}
function AnswerCard({
  turn,
  onEvidence,
  onEscalate,
}: {
  turn: Turn;
  onEvidence: (c: Citation) => void;
  onEscalate: () => void;
}) {
  const [copy, setCopy] = useState("Copy answer");
  const r = turn.response!;
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );
  async function copyAnswer() {
    try {
      await navigator.clipboard.writeText(responseAsText(turn.query, r));
      setCopy("Copied");
    } catch {
      setCopy("Copy unavailable");
    }
    copyTimer.current = setTimeout(() => setCopy("Copy answer"), 2200);
  }
  return (
    <article className="answer-card">
      <div className="answer-top">
        <span>
          <Mark small />
          <b>Wealthdesk</b>
          <small>SAVED RESPONSE</small>
        </span>
        <span className={`pill ${r.id === "unknown" ? "neutral" : "amber"}`}>
          {r.status}
        </span>
      </div>
      <div className="answer-body">
        <span className="eyebrow">{r.eyebrow}</span>
        <h2>{r.title}</h2>
        <p className="answer-intro">{r.intro}</p>
        {r.table && (
          <div className="answer-table-wrap reveal">
            <table className="answer-table">
              <thead>
                <tr>
                  {r.table.headers.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((c, j) => (
                      <td key={j}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="answer-sections">
          {r.sections.map((s, i) => (
            <section
              className="reveal"
              style={{ animationDelay: `${i * 130}ms` }}
              key={s.title}
            >
              <h3>{s.title}</h3>
              <p>
                {s.text}
                {s.citation !== undefined && (
                  <button
                    className="inline-cite"
                    aria-label={`Open source ${s.citation + 1}`}
                    onClick={() => onEvidence(r.citations[s.citation!])}
                  >
                    {s.citation + 1}
                  </button>
                )}
              </p>
            </section>
          ))}
        </div>
        {r.example && (
          <div className="example-block reveal">
            <span className="eyebrow">{r.example.label}</span>
            <p>{r.example.text}</p>
          </div>
        )}
        <div className="next-step">
          <Icon name="arrow" size={19} />
          <div>
            <b>Before the client conversation</b>
            <p>{r.next}</p>
          </div>
        </div>
        {r.citations.length > 0 && (
          <div className="citations">
            <div className="section-label">
              <span>ATTACHED REFERENCES</span>
              <span>{r.citations.length.toString().padStart(2, "0")}</span>
            </div>
            {r.citations.map((c, i) => {
              const d = documents.find((d) => d.id === c.documentId)!;
              return (
                <button
                  className="citation-card"
                  key={`${c.documentId}-${c.page}`}
                  onClick={() => onEvidence(c)}
                >
                  <span className="citation-index">{i + 1}</span>
                  <span>
                    <b>{d.shortTitle}</b>
                    <small>
                      {d.issuer} · {d.date}
                    </small>
                  </span>
                  <span className="page-label">p. {c.page}</span>
                  <Icon name="external" size={15} />
                </button>
              );
            })}
          </div>
        )}
        <div className="answer-actions">
          <button onClick={copyAnswer} className="text-button">
            <Icon name={copy === "Copied" ? "check" : "copy"} size={15} />
            {copy}
          </button>
          <button onClick={onEscalate} className="text-button">
            <Icon name="flag" size={15} />
            Request specialist review
          </button>
        </div>
        <p className="answer-footnote">
          Hardcoded response · Public source snapshots · Bank approval and
          current applicability require review.
        </p>
      </div>
    </article>
  );
}
export default function Home() {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(0);
  const [citation, setCitation] = useState<Citation | null>(null);
  const [toast, setToast] = useState("");
  const [localNotice, setLocalNotice] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const latest = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const busy = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  const submit = useCallback(
    (raw: string) => {
      const query = raw.trim();
      if (!query || busy.current) return;
      busy.current = true;
      clearTimers();
      setInput("");
      setPhase(0);
      setLoading(true);
      const id = crypto.randomUUID();
      setTurns((prev) => [...prev, { id, query, response: null }]);
      timers.current.push(
        setTimeout(() => setPhase(1), 550),
        setTimeout(() => setPhase(2), 1150),
        setTimeout(() => {
          const response = matchResponse(query);
          setTurns((prev) =>
            prev.map((t) => (t.id === id ? { ...t, response } : t)),
          );
          setLoading(false);
          busy.current = false;
          const history = readStored<SavedQuery[]>("wealthdesk:history", []);
          if (
            !writeStored(
              "wealthdesk:history",
              [
                {
                  id,
                  query,
                  date: new Date().toISOString(),
                  responseId: response.id,
                },
                ...history,
              ].slice(0, 60),
            )
          )
            setLocalNotice(
              "Browser storage is unavailable. This conversation will not be saved.",
            );
        }, 1850),
      );
    },
    [clearTimers],
  );
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) {
      const t = setTimeout(() => submit(q), 50);
      timers.current.push(t);
    }
    function reset() {
      clearTimers();
      busy.current = false;
      setLoading(false);
      setTurns([]);
      setInput("");
      textarea.current?.focus();
    }
    window.addEventListener("wealthdesk:new", reset);
    function hotkey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        textarea.current?.focus();
      }
    }
    window.addEventListener("keydown", hotkey);
    return () => {
      clearTimers();
      if (toastTimer.current) clearTimeout(toastTimer.current);
      window.removeEventListener("wealthdesk:new", reset);
      window.removeEventListener("keydown", hotkey);
    };
  }, [submit, clearTimers]);
  useEffect(() => {
    if (turns.length)
      latest.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
  }, [turns.length]);
  function stop() {
    clearTimers();
    busy.current = false;
    setLoading(false);
    setTurns((prev) =>
      prev.map((t) => (!t.response ? { ...t, stopped: true } : t)),
    );
  }
  function escalate(turn: Turn) {
    const items = readStored<Escalation[]>(
      "wealthdesk:escalations",
      initialEscalations,
    );
    if (
      items.some((x) => x.question === turn.query && x.status !== "Resolved")
    ) {
      setToast("This question is already in specialist review.");
    } else {
      const ok = writeStored("wealthdesk:escalations", [
        {
          id: "ESC-" + crypto.randomUUID().slice(0, 6).toUpperCase(),
          question: turn.query,
          owner: "Sarah W.",
          priority: "Normal",
          status: "Open",
          note: "",
        },
        ...items,
      ]);
      setToast(
        ok
          ? "Saved to specialist review on this browser."
          : "Could not save: browser storage is unavailable.",
      );
    }
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 4500);
  }
  return (
    <div className={`workspace ${turns.length ? "has-conversation" : ""}`}>
      {!turns.length ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", textAlign: "center", padding: "0 20px" }}>
          <div style={{ marginBottom: "2rem", color: "#6356a4" }}>
            <Mark />
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            What can I help you clarify?
          </h1>
          <p style={{ color: "#7c7d83", marginBottom: "3rem", fontSize: "14px" }}>
            Explore considered answers backed by official bank references.
          </p>
          <div style={{ width: "100%", maxWidth: "700px", marginBottom: "2rem" }}>
            <Composer
              input={input}
              setInput={setInput}
              textarea={textarea}
              submit={submit}
              loading={loading}
              stop={stop}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", maxWidth: "800px" }}>
            {prompts.map((p) => (
              <button
                key={p.title}
                onClick={() => submit(p.text)}
                style={{
                  background: "transparent", border: "1px solid #dcd7e6", borderRadius: "20px",
                  padding: "8px 16px", fontSize: "12px", color: "#656874",
                  cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "#a898c5"; e.currentTarget.style.background = "#fff"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "#dcd7e6"; e.currentTarget.style.background = "transparent"; }}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="conversation-header">
            <div>
              <span className="eyebrow">YOUR ADVISORY DESK</span>
              <h1>A conversation with context.</h1>
            </div>
            <button
              className="secondary-button"
              onClick={() => {
                window.history.replaceState({}, "", "/");
                window.dispatchEvent(new Event("wealthdesk:new"));
              }}
            >
              <Icon name="plus" size={16} />
              New
            </button>
          </div>
          <div className="conversation-thread">
            {turns.map((t, i) => (
              <div
                key={t.id}
                ref={i === turns.length - 1 ? latest : undefined}
                className="turn"
              >
                <div className="user-question">
                  <span className="top-avatar">SW</span>
                  <div>
                    <span className="eyebrow">YOUR QUESTION</span>
                    <p>{t.query}</p>
                  </div>
                </div>
                {t.response ? (
                  <AnswerCard
                    turn={t}
                    onEvidence={setCitation}
                    onEscalate={() => escalate(t)}
                  />
                ) : t.stopped ? (
                  <div className="stopped">
                    <Icon name="stop" size={17} />
                    Response stopped. Your question is still here.
                    <button
                      className="text-button"
                      disabled={loading}
                      onClick={() => submit(t.query)}
                    >
                      Try again
                    </button>
                  </div>
                ) : (
                  <div className="thinking" role="status" aria-live="polite">
                    <div className="thinking-mark">
                      <Mark small />
                    </div>
                    <div>
                      <b>
                        {
                          [
                            "Opening the saved response",
                            "Preparing source references",
                            "Formatting your answer",
                          ][phase]
                        }
                        <span className="typing-dots">
                          <i />
                          <i />
                          <i />
                        </span>
                      </b>
                      <p>A little context makes all the difference.</p>
                      <div className="thinking-steps">
                        {["Response", "References", "Ready"].map((s, j) => (
                          <span key={s} className={j <= phase ? "done" : ""}>
                            {j < phase ? (
                              <Icon name="check" size={12} />
                            ) : (
                              <i />
                            )}
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="conversation-composer">
            <Composer
              input={input}
              setInput={setInput}
              textarea={textarea}
              submit={submit}
              loading={loading}
              stop={stop}
            />
            <div className="followup-prompts">
              {prompts.map((p) => (
                <button
                  key={p.title}
                  disabled={loading}
                  onClick={() => submit(p.text)}
                >
                  {p.title}
                  <Icon name="arrow" size={12} />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {localNotice && (
        <p className="notice" role="status">
          {localNotice}
        </p>
      )}
      {toast && (
        <div className="toast" role="status">
          <Icon name="check" size={18} />
          {toast}
          <Link href="/escalations">View</Link>
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
function Composer({
  input,
  setInput,
  textarea,
  submit,
  loading,
  stop,
}: {
  input: string;
  setInput: (s: string) => void;
  textarea: React.RefObject<HTMLTextAreaElement | null>;
  submit: (q: string) => void;
  loading: boolean;
  stop: () => void;
}) {
  return (
    <form
      className={`composer ${input ? "has-input" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        submit(input);
      }}
    >
      <label className="sr-only" htmlFor="prompt-input">
        Ask a wealth advisory question
      </label>
      <textarea
        id="prompt-input"
        ref={textarea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What would you like to clarify?"
        rows={2}
        maxLength={1500}
        disabled={loading}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            submit(input);
          }
        }}
      />
      <div className="composer-bottom">
        <span>
          <Icon name="book" size={15} />
          Curated knowledge<span className="composer-shortcut">⌘ / Ctrl K</span>
        </span>
        {loading ? (
          <button
            className="submit-button stop"
            type="button"
            onClick={stop}
            aria-label="Stop response"
          >
            <Icon name="stop" size={17} />
          </button>
        ) : (
          <button
            className="submit-button"
            type="submit"
            disabled={!input.trim()}
            aria-label="Submit question"
          >
            <Icon name="arrow" size={20} />
          </button>
        )}
      </div>
      <div className="composer-foot">
        <span>Saved answers, grounded in attached references.</span>
        <span>
          {input.length ? `${input.length}/1500` : "↵ Send · ⇧↵ New line"}
        </span>
      </div>
    </form>
  );
}
