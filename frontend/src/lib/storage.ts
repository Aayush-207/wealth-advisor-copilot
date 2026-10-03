"use client";
import { useSyncExternalStore } from "react";
const event = "wealthdesk:storage";
export function readStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function writeStored(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(event));
    return true;
  } catch {
    return false;
  }
}
function subscribe(cb: () => void) {
  window.addEventListener(event, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(event, cb);
    window.removeEventListener("storage", cb);
  };
}
export function useStored<T>(key: string, fallback: T): [T, (v: T) => boolean] {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );
  let value = fallback;
  try {
    if (raw) value = JSON.parse(raw);
  } catch {}
  return [value, (v: T) => writeStored(key, v)];
}
export type SavedQuery = {
  id: string;
  query: string;
  date: string;
  responseId: string;
};
export type Escalation = {
  id: string;
  question: string;
  owner: string;
  priority: string;
  status: string;
  note: string;
};
export const initialEscalations: Escalation[] = [
  {
    id: "ESC-401",
    question:
      "How does the new digital tax affect offshore trusts established before 2020?",
    owner: "Sarah W.",
    priority: "High",
    status: "Open",
    note: "",
  },
  {
    id: "ESC-402",
    question:
      "Is the structured note product compliant with the latest FCA consumer duty constraints?",
    owner: "James L.",
    priority: "Critical",
    status: "In review",
    note: "",
  },
];
