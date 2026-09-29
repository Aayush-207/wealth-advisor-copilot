import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wealth Advisor Copilot',
  description: 'AI Assistant for Relationship Managers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
