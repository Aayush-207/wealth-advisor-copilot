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
    <main className="h-screen overflow-y-auto bg-zinc-950 text-zinc-100 p-8 md:p-12">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        
        <header className="border-b border-zinc-800 pb-6 mt-4">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-2">
            Document Administration
          </h1>
          <p className="text-zinc-500 text-sm">Manage metadata, independent approvals, and document withdrawals.</p>
        </header>

        <h2 className="text-lg font-medium text-zinc-300 mt-2">Document Queue & Controls</h2>
        
        <div className="flex flex-col gap-4">
          {approvals.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors ${
                item.status === 'Withdrawn' ? 'bg-zinc-900/30 border-zinc-800 opacity-50' :
                item.status === 'Active' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-900 border-zinc-700'
              }`}
            >
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-zinc-500">{item.id}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    item.risk === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.risk} Risk
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    item.status === 'Pending' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="text-[15px] font-medium text-zinc-200">{item.title}</h3>
                <div className="text-[12px] text-zinc-500 mt-1 flex flex-wrap gap-4">
                  <span>Owner: <span className="text-zinc-400">{item.submitter}</span></span>
                  <span>Category: <span className="text-zinc-400">{item.metadata.category}</span></span>
                  <span>Valid Until: <span className="text-zinc-400">{item.metadata.validUntil}</span></span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                <button className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors text-xs font-medium border border-zinc-700">
                  Edit Metadata
                </button>
                {item.status === 'Pending' && (
                  <button onClick={() => handleAction(item.id, 'Active')} className="px-3 py-1.5 bg-zinc-200 hover:bg-white text-zinc-900 rounded-md transition-colors text-xs font-semibold">
                    Approve
                  </button>
                )}
                {item.status === 'Active' && (
                  <button onClick={() => handleAction(item.id, 'Withdrawn')} className="px-3 py-1.5 bg-zinc-900 border border-red-900 hover:bg-red-950 text-red-400 rounded-md transition-colors text-xs font-medium">
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
