import './globals.css';
import type { Metadata } from 'next';
import Sidebar from '../components/Sidebar';

export const metadata: Metadata = {
  title: 'Wealth Advisor Copilot',
  description: 'AI Assistant for Relationship Managers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden bg-zinc-950">
        <Sidebar />
        <div className="flex-1 relative overflow-hidden bg-zinc-950">
          {children}
        </div>
      </body>

    </html>
  );
}
