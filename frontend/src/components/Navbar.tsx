"use client";

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
              Wealth Copilot
            </Link>
            <div className="hidden md:flex gap-4 text-sm font-medium">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors">Chat</Link>
              <Link href="/history" className="text-slate-300 hover:text-white transition-colors">History</Link>
              <Link href="/documents" className="text-slate-300 hover:text-white transition-colors">Library</Link>
              <Link href="/admin" className="text-slate-300 hover:text-white transition-colors">Approvals</Link>
              <Link href="/escalations" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                Escalations
                <span className="bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 rounded-full">2</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Current Role:</span>
            <div className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2 font-medium">
              Relationship Manager
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
