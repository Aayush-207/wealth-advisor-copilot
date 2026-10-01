"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EscalationsDashboard() {
  const [escalations, setEscalations] = useState([
    { id: 'ESC-401', question: 'How does the new digital tax affect offshore trusts established before 2020?', RM: 'Sarah W.', priority: 'High', status: 'Pending Review', submitted: '30 mins ago' },
    { id: 'ESC-402', question: 'Is the structured note product compliant with the latest FCA consumer duty constraints?', RM: 'James L.', priority: 'Critical', status: 'In Progress', submitted: '2 hours ago' },
  ]);

  const handleResolve = (id: string) => {
    setEscalations(escalations.map(e => e.id === id ? { ...e, status: 'Resolved' } : e));
  };

  return (
    <main className="h-screen overflow-y-auto bg-zinc-950 text-zinc-100 p-8 md:p-12">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        
        <header className="border-b border-zinc-800 pb-6 mt-4">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-2">
            Specialist Review
          </h1>
          <p className="text-zinc-500 text-sm">Address unresolved questions escalated by Relationship Managers.</p>
        </header>

        <div className="flex flex-col gap-4">
          {escalations.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`border rounded-xl p-5 flex flex-col gap-4 transition-all ${
                item.status === 'Resolved' ? 'bg-zinc-900/50 border-emerald-900/50 opacity-75' : 'bg-zinc-900 border-amber-900/50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-zinc-500">{item.id}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      item.priority === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {item.priority} Priority
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      item.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-medium text-zinc-200 mt-2">"{item.question}"</h3>
                  <p className="text-xs text-zinc-500 mt-1">Escalated by <span className="text-zinc-400 font-medium">{item.RM}</span> • {item.submitted}</p>
                </div>
                
                {item.status !== 'Resolved' && (
                  <button onClick={() => handleResolve(item.id)} className="px-3 py-1.5 bg-zinc-200 hover:bg-white text-zinc-900 rounded-md text-xs font-semibold transition-colors whitespace-nowrap">
                    Mark Resolved
                  </button>
                )}
              </div>
              
              {item.status !== 'Resolved' && (
                <div className="mt-2 pt-4 border-t border-zinc-800">
                  <textarea 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-300 placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors" 
                    placeholder="Draft response to Relationship Manager..."
                    rows={3}
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button onClick={() => handleResolve(item.id)} className="px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 text-blue-400 rounded-md text-xs font-semibold transition-colors">
                      Send Reply
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
