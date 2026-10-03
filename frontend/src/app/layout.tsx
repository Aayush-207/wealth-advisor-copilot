import "./globals.css";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
export const metadata: Metadata = {
  title: "Wealthdesk — The advisor’s companion",
  description:
    "A curated, source-linked wealth advisory workspace. Hardcoded demo responses, official reference PDFs, no live AI.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
