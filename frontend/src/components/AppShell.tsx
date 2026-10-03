"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import Icon, { Mark, type IconName } from "./Icon";
const nav: { href: string; label: string; icon: IconName; section?: string }[] =
  [
    { href: "/", label: "Advisor workspace", icon: "chat" },
    { href: "/history", label: "Conversations", icon: "history" },
    { href: "/documents", label: "Document library", icon: "book" },
    {
      href: "/admin",
      label: "Document review",
      icon: "shield",
      section: "GOVERNANCE",
    },
    { href: "/escalations", label: "Specialist review", icon: "flag" },
  ];
function subscribeToViewport(callback: () => void) {
  const media = window.matchMedia("(max-width: 760px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
export default function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [intro, setIntro] = useState(false);
  const mobile = useSyncExternalStore(
    subscribeToViewport,
    () => window.matchMedia("(max-width: 760px)").matches,
    () => false,
  );
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let frame: number;
    let done = false;
    try {
      done = sessionStorage.getItem("wealthdesk:intro") === "seen";
      sessionStorage.setItem("wealthdesk:intro", "seen");
    } catch {}
    if (
      !done &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      frame = requestAnimationFrame(() => setIntro(true));
      timer = setTimeout(() => setIntro(false), 1450);
    }
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {intro && (
        <div
          className="intro"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to Wealthdesk"
        >
          <Mark />
          <div className="intro-word">
            Wealth<span>desk.</span>
          </div>
          <p>A little clarity goes a long way.</p>
          <div className="intro-track">
            <i />
          </div>
          <button autoFocus onClick={() => setIntro(false)}>
            Enter workspace <Icon name="arrow" size={16} />
          </button>
        </div>
      )}
      <div className="mobile-header" inert={intro}>
        <Link href="/" aria-label="Wealthdesk home">
          <Mark small />
          Wealthdesk.
        </Link>
        <button
          className="icon-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      {open && (
        <button
          className="nav-scrim"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <aside
        className={`sidebar ${open ? "is-open" : ""}`}
        inert={intro || (mobile && !open)}
      >
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <Mark />
          <span>
            Wealthdesk<span className="brand-dot">.</span>
            <small>THE ADVISOR’S COMPANION</small>
          </span>
        </Link>
        <Link
          href="/?new=1"
          onClick={() => {
            window.dispatchEvent(new Event("wealthdesk:new"));
            setOpen(false);
          }}
          className="new-conversation"
        >
          <Icon name="plus" size={18} />
          New conversation<kbd>↵</kbd>
        </Link>
        <div className="nav-label">YOUR WORKSPACE</div>
        <nav aria-label="Main navigation">
          {nav.map((n) => (
            <div key={n.href}>
              {n.section && (
                <div className="nav-label governance">{n.section}</div>
              )}
              <Link
                className={`nav-item ${path === n.href ? "active" : ""}`}
                href={n.href}
                aria-current={path === n.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <Icon name={n.icon} size={19} />
                <span>{n.label}</span>
                {path === n.href && <span className="nav-dot" />}
              </Link>
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="workspace-note">
            <div>
              <span className="live-dot" />
              CURATED DEMO
            </div>
            <p>
              Good advice starts
              <br />
              with a reliable source.
            </p>
            <Link href="/documents" onClick={() => setOpen(false)}>
              Explore the library
              <Icon name="arrow" size={15} />
            </Link>
          </div>
          <div className="profile">
            <span className="avatar">SW</span>
            <span>
              <b>Sarah Williams</b>
              <small>Relationship manager · Demo</small>
            </span>
            <span className="profile-dot" />
          </div>
        </div>
      </aside>
      <div className="app-frame" inert={intro || (mobile && open)}>

        <main id="main" className="page-frame" key={path}>
          {children}
        </main>
        <footer className="app-footer">
          <span>Designed for considered conversations.</span>
          <span>
            DEMO WORKSPACE <i /> INDIA REFERENCE COLLECTION
          </span>
        </footer>
      </div>
    </>
  );
}
