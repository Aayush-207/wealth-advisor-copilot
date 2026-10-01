"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HistoryDashboard() {
  const history = [
    { id: 'QA-112', query: 'What is the capital gains tax for equity mutual funds?', answerSnippet: 'Based on the Income-tax Act, 2025, the sale of equity...', date: '2026-09-30 14:22', status: 'Verified', checkedAgainst: 'Income Tax Department FAQs 2026' },
    { id: 'QA-113', query: 'Can I transfer an ISA without losing tax wrapper?', answerSnippet: 'Yes, provided the transfer is done directly between providers...', date: '2026-09-29 09:15', status: 'Re-verification Needed', checkedAgainst: 'ISA Transfer Policy v4 (Superseded)' },
    { id: 'QA-114', query: 'Fee structure for Global Equity Fund Class A', answerSnippet: 'The management fee is 1.50%...', date: '2026-09-28 16:45', status: 'Verified', checkedAgainst: 'Global Equity Fund Factsheet' },
  ];

  return (
    <main className="h-screen overflow-y-auto bg-zinc-950 text-zinc-100 p-8 md:p-12">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        
        <header className="border-b border-zinc-800 pb-6 mt-4">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-2">
            Query History
          </h1>
          <p className="text-zinc-500 text-sm">Review saved answers. Re-use queries are automatically checked against the latest documents.</p>
        </header>

        <div className="flex flex-col gap-4">
          {history.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-3 hover:border-zinc-700 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-[15px] font-medium text-zinc-200">"{item.query}"</h3>
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap ${
                  item.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {item.status}
                </span>
              </div>
              
              <p className="text-sm text-zinc-400 leading-relaxed">{item.answerSnippet}</p>
              
              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                <span className="text-zinc-600 font-medium">{item.date}</span>
                <span className="text-zinc-700">•</span>
                <span className="text-zinc-500">
                  Checked against: <span className={item.status === 'Verified' ? 'text-zinc-400 font-medium' : 'text-amber-500 line-through'}>{item.checkedAgainst}</span>
                </span>
                {item.status !== 'Verified' && (
                  <button className="ml-auto px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-md transition-colors">
                    Re-verify
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
