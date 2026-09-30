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
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 md:p-24 pb-32">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        
        <header className="flex justify-between items-end border-b border-slate-700/50 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
              Specialist Review
            </h1>
            <p className="text-slate-400 text-lg">Address unresolved questions escalated by Relationship Managers.</p>
          </div>
        </header>

        <div className="flex flex-col gap-4 mt-4">
          {escalations.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`border rounded-xl p-6 flex flex-col gap-4 transition-all ${
                item.status === 'Resolved' ? 'bg-slate-900/50 border-teal-500/30 opacity-75' : 'bg-slate-800/60 border-orange-500/30 shadow-lg shadow-orange-500/5'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-slate-400">{item.id}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      item.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {item.priority} Priority
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      item.status === 'Resolved' ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-200 mt-2">"{item.question}"</h3>
                  <p className="text-sm text-slate-400 mt-1">Escalated by {item.RM} • {item.submitted}</p>
                </div>
                
                {item.status !== 'Resolved' && (
                  <button onClick={() => handleResolve(item.id)} className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-lg text-sm font-bold shadow-md transition-colors whitespace-nowrap">
                    Mark Resolved
                  </button>
                )}
              </div>
              
              {item.status !== 'Resolved' && (
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <textarea 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500 transition-colors" 
                    placeholder="Draft response to Relationship Manager..."
                    rows={3}
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button onClick={() => handleResolve(item.id)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors">
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
