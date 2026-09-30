"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AdminApprovals() {
  const pendingApprovals = [
    { id: 'PUB-992', title: 'Q4 Wealth Management Strategy', submitter: 'John D.', submitted: '2 hours ago', risk: 'Medium' },
    { id: 'PUB-993', title: 'Update to ISA Fee Structure', submitter: 'Alice M.', submitted: '5 hours ago', risk: 'High' },
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 md:p-24 pb-32">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        
        <header className="flex justify-between items-end border-b border-slate-700/50 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
              Approval Controls
            </h1>
            <p className="text-slate-400 text-lg">Review and authorise document versions before they enter the RAG pipeline.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl">
            <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Pending Review</h3>
            <p className="text-4xl font-bold text-blue-400">12</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl">
            <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Quarantined</h3>
            <p className="text-4xl font-bold text-orange-400">3</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl">
            <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Published Today</h3>
            <p className="text-4xl font-bold text-teal-400">8</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-200 mt-4">Needs Approval</h2>
        
        <div className="flex flex-col gap-4">
          {pendingApprovals.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-slate-800/60 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-slate-400">{item.id}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    item.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.risk} Risk
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-200">{item.title}</h3>
                <p className="text-sm text-slate-400 mt-1">Submitted by {item.submitter} • {item.submitted}</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors text-sm font-semibold border border-slate-600 hover:border-slate-500">
                  Inspect Diff
                </button>
                <button className="flex-1 md:flex-none px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-lg transition-colors text-sm font-bold shadow-lg shadow-teal-500/20">
                  Approve
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
