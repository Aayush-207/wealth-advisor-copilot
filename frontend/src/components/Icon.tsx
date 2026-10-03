import type { CSSProperties } from "react";
export type IconName =
  | "chat"
  | "history"
  | "book"
  | "shield"
  | "flag"
  | "arrow"
  | "plus"
  | "search"
  | "close"
  | "chevron"
  | "download"
  | "external"
  | "copy"
  | "check"
  | "menu"
  | "filter"
  | "clock"
  | "file"
  | "send"
  | "stop"
  | "spark"
  | "logout";
const paths: Record<IconName, React.ReactNode> = {
  chat: (
    <>
      <path d="M20 11a8 8 0 0 1-8 8H5l-3 3V11a9 9 0 0 1 18 0Z" />
      <path d="M7 9h8M7 13h5" />
    </>
  ),
  history: (
    <>
      <path d="M3 10a9 9 0 1 1 1 7M3 4v6h6" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  book: (
    <>
      <path d="M3 4h6l3 2 3-2h6v15h-6l-3 2-3-2H3ZM12 6v15" />
    </>
  ),
  shield: (
    <>
      <path d="m12 2 8 3v6c0 5-8 10-8 10S4 16 4 11V5Z" />
      <path d="m8 11 3 3 5-6" />
    </>
  ),
  flag: (
    <>
      <path d="M5 22V3m0 0c5-4 9 4 15 0v10c-6 4-10-4-15 0" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="m15 15 6 6" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  download: (
    <>
      <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
    </>
  ),
  external: (
    <>
      <path d="M14 3h7v7m0-7L10 14M10 3H3v18h18v-7" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="13" height="13" rx="2" />
      <path d="M16 8V3H3v13h5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  filter: (
    <>
      <path d="M4 7h16M4 17h16" />
      <circle cx="8" cy="7" r="2" />
      <circle cx="16" cy="17" r="2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  file: (
    <>
      <path d="M5 2h9l5 5v15H5ZM14 2v6h5M8 13h8M8 17h6" />
    </>
  ),
  send: <path d="m3 3 19 9-19 9 4-9Zm4 9h15" />,
  stop: <rect x="6" y="6" width="12" height="12" rx="2" />,
  spark: (
    <>
      <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />
    </>
  ),
  logout: (
    <>
      <path d="M9 3H3v18h6M9 12h12m-5-5 5 5-5 5" />
    </>
  ),
};
export default function Icon({
  name,
  size = 20,
  className = "",
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
export function Mark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark ${small ? "small" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <path
          d="m5 9 8 22 7-16 7 16 8-22M12 9l8 22 8-22"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}
