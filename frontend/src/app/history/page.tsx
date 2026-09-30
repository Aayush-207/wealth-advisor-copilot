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
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 md:p-24 pb-32">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        
        <header className="flex justify-between items-end border-b border-slate-700/50 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
              Query History
            </h1>
            <p className="text-slate-400 text-lg">Review saved answers. Re-use queries are automatically checked against the latest documents.</p>
          </div>
        </header>

        <div className="flex flex-col gap-4 mt-4">
          {history.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 flex flex-col gap-3 hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-slate-200">"{item.query}"</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                  item.status === 'Verified' ? 'bg-teal-500/20 text-teal-400' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                }`}>
                  {item.status}
                </span>
              </div>
              
              <p className="text-slate-400">{item.answerSnippet}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                <span className="text-slate-500">{item.date}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">
                  Checked against: <span className={item.status === 'Verified' ? 'text-teal-400' : 'text-orange-400 line-through'}>{item.checkedAgainst}</span>
                </span>
                {item.status !== 'Verified' && (
                  <button className="ml-auto px-4 py-1.5 bg-blue-500 hover:bg-blue-400 text-white rounded-lg text-xs font-bold transition-colors">
                    Re-verify Answer
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
