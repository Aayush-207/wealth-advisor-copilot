"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function DocumentLibrary() {
  const documents = [
    { id: 1, title: 'Global Equity Fund Factsheet', type: 'PDF', owner: 'Product Team', status: 'Active', updated: '2026-09-01' },
    { id: 2, title: 'Income Tax Transition Rules 2026', type: 'PDF', owner: 'Tax Dept', status: 'Active', updated: '2026-08-15' },
    { id: 3, title: 'ISA Transfer Policy v4', type: 'DOCX', owner: 'Compliance', status: 'Superseded', updated: '2025-11-20' },
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 md:p-24 pb-32">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        
        <header className="flex justify-between items-end border-b border-slate-700/50 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
              Document Library
            </h1>
            <p className="text-slate-400 text-lg">Browse, filter, and inspect approved bank materials.</p>
          </div>
          <div className="flex gap-4">
            <input type="text" placeholder="Search title or ID..." className="bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500" />
            <button className="bg-slate-800 border border-slate-700 hover:bg-slate-700 px-4 py-2 rounded-lg text-slate-300 transition-colors">
              Filter
            </button>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full overflow-hidden rounded-2xl border border-slate-700/50 shadow-xl bg-slate-800/50 backdrop-blur-md"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-slate-300 uppercase text-xs tracking-wider border-b border-slate-700/50">
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Owner</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Last Updated</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {documents.map((doc, i) => (
                <motion.tr 
                  key={doc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="hover:bg-slate-700/30 transition-colors group"
                >
                  <td className="px-6 py-4 text-slate-200 font-medium">{doc.title}</td>
                  <td className="px-6 py-4 text-slate-400">
                    <span className="bg-slate-700 px-2 py-1 rounded text-xs">{doc.type}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{doc.owner}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      doc.status === 'Active' ? 'bg-teal-500/20 text-teal-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{doc.updated}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">View Details</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </main>
  );
}
