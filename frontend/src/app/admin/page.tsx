"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState([
    { id: 'PUB-992', title: 'Q4 Wealth Management Strategy', submitter: 'John D.', submitted: '2 hours ago', risk: 'Medium', metadata: { category: 'Strategy', validUntil: '2026-12-31' }, status: 'Pending' },
    { id: 'PUB-993', title: 'Update to ISA Fee Structure', submitter: 'Alice M.', submitted: '5 hours ago', risk: 'High', metadata: { category: 'Fees', validUntil: '2027-04-05' }, status: 'Pending' },
    { id: 'PUB-994', title: 'Capital Gains Tax FAQ', submitter: 'Tax Dept', submitted: '1 day ago', risk: 'Low', metadata: { category: 'Tax', validUntil: '2027-03-31' }, status: 'Active' },
  ]);

  const handleAction = (id: string, action: string) => {
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: action } : a));
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 md:p-24 pb-32">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        
        <header className="flex justify-between items-end border-b border-slate-700/50 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
              Document Administration
            </h1>
            <p className="text-slate-400 text-lg">Manage metadata, independent approvals, and document withdrawals.</p>
          </div>
        </header>

        <h2 className="text-2xl font-bold text-slate-200 mt-4">Document Queue & Controls</h2>
        
        <div className="flex flex-col gap-4">
          {approvals.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors ${
                item.status === 'Withdrawn' ? 'bg-slate-900/40 border-slate-800 opacity-50' :
                item.status === 'Active' ? 'bg-slate-800/40 border-teal-500/30' : 'bg-slate-800/40 border-slate-700/50'
              }`}
            >
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-slate-400">{item.id}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    item.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.risk} Risk
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    item.status === 'Pending' ? 'bg-blue-500/20 text-blue-400' :
                    item.status === 'Active' ? 'bg-teal-500/20 text-teal-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-200">{item.title}</h3>
                <div className="text-sm text-slate-400 mt-1 flex gap-4">
                  <span>Owner: {item.submitter}</span>
                  <span>Category: {item.metadata.category}</span>
                  <span>Valid Until: {item.metadata.validUntil}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors text-sm font-semibold border border-slate-600">
                  Edit Metadata
                </button>
                {item.status === 'Pending' && (
                  <button onClick={() => handleAction(item.id, 'Active')} className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-lg transition-colors text-sm font-bold shadow-lg shadow-teal-500/20">
                    Independent Approval
                  </button>
                )}
                {item.status === 'Active' && (
                  <button onClick={() => handleAction(item.id, 'Withdrawn')} className="px-4 py-2 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm font-bold shadow-lg shadow-red-500/10">
                    Withdraw
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
