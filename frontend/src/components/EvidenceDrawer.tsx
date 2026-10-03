"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";
import { documents, type Citation } from "@/lib/knowledge";
export default function EvidenceDrawer({
  citation,
  onClose,
}: {
  citation: Citation | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [embed, setEmbed] = useState(false);
  useEffect(() => {
    const el = dialog.current;
    if (!citation || !el) return;
    const focus = document.activeElement as HTMLElement;
    el.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      el.close();
      focus?.focus();
    };
  }, [citation]);
  if (!citation) return null;
  const doc = documents.find((d) => d.id === citation.documentId);
  if (!doc) return null;
  return createPortal(
    <dialog
      ref={dialog}
      className="evidence-dialog"
      aria-labelledby="evidence-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="drawer-content">
        <header className="drawer-header">
          <span className="eyebrow">THE SOURCE DESK</span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close evidence"
          >
            <Icon name="close" />
          </button>
        </header>
        <div className="drawer-body">
          <div className="document-cover">
            <Icon name="file" size={32} />
            <span>{doc.issuer}</span>
            <strong>{doc.shortTitle}</strong>
            <small>
              {doc.date} · {doc.pages} pages
            </small>
            <span className="cover-seal">
              OFFICIAL
              <br />
              REFERENCE
            </span>
          </div>
          <span className="pill violet">PDF PAGE {citation.page}</span>
          <h2 id="evidence-title">{doc.title}</h2>
          <p className="muted">{citation.section}</p>
          <div className="source-explanation">
            <span className="eyebrow">WHY THIS SOURCE IS ATTACHED</span>
            <p>{citation.summary}</p>
            <small>Editorial summary. Read the original page below.</small>
          </div>
          <div className="notice">
            <Icon name="shield" size={18} />
            <p>{doc.note} Public reference; not bank-approved.</p>
          </div>
          <div className="drawer-actions">
            <a
              className="primary-button"
              href={`${doc.file}#page=${citation.page}`}
              target="_blank"
              rel="noreferrer"
            >
              Open PDF · p. {citation.page}
              <Icon name="external" size={16} />
            </a>
            <a className="secondary-button" href={doc.file} download>
              <Icon name="download" size={16} />
              Download
            </a>
          </div>
          <button
            className="text-button preview-toggle"
            onClick={() => setEmbed(!embed)}
          >
            {embed ? "Hide" : "Show"} inline PDF preview
            <Icon name="chevron" size={14} />
          </button>
          {embed && (
            <iframe
              className="pdf-preview"
              title={`${doc.title}, page ${citation.page}`}
              src={`${doc.file}#page=${citation.page}`}
            />
          )}
          <dl className="source-meta">
            <div>
              <dt>Publisher</dt>
              <dd>{doc.issuer}</dd>
            </div>
            <div>
              <dt>Snapshot date</dt>
              <dd>{doc.date}</dd>
            </div>
            <div>
              <dt>Page numbering</dt>
              <dd>1-based PDF pages</dd>
            </div>
            <div>
              <dt>Original source</dt>
              <dd>
                <a href={doc.source} target="_blank" rel="noreferrer">
                  Publisher website <Icon name="external" size={12} />
                </a>
              </dd>
            </div>
          </dl>
          <details className="checksum">
            <summary>Document integrity</summary>
            <code>SHA-256: {doc.sha256}</code>
          </details>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
