"use client";

import React from 'react';

export default function DocumentLibrary() {
  const documents = [
    { id: 1, title: 'Global Equity Fund Factsheet', type: 'PDF', owner: 'Product Team', status: 'Active', updated: '2026-09-01' },
    { id: 2, title: 'Income Tax Transition Rules 2026', type: 'PDF', owner: 'Tax Dept', status: 'Active', updated: '2026-08-15' },
    { id: 3, title: 'ISA Transfer Policy v4', type: 'DOCX', owner: 'Compliance', status: 'Superseded', updated: '2025-11-20' },
  ];

  return (
    <main className="h-screen overflow-y-auto bg-zinc-950 text-zinc-100 p-8 md:p-12">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        
        <header className="border-b border-zinc-800 pb-6 mt-4 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-2">
              Document Library
            </h1>
            <p className="text-zinc-500 text-sm">Browse, filter, and inspect approved bank materials.</p>
          </div>
          <div className="flex gap-3">
            <input type="text" placeholder="Search title or ID..." className="bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-md px-3 py-1.5 outline-none focus:border-zinc-700 text-sm transition-colors" />
            <button className="bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 px-3 py-1.5 rounded-md text-zinc-300 transition-colors text-sm font-medium">
              Filter
            </button>
          </div>
        </header>

        <div className="w-full overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-900">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-800/50 text-zinc-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Owner</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Last Updated</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {documents.map((doc, i) => (
                <tr key={doc.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-200">{doc.title}</td>
                  <td className="px-6 py-4">
                    <span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400">{doc.type}</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{doc.owner}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[11px] font-bold ${
                      doc.status === 'Active' ? 'text-emerald-400 bg-emerald-400/10' : 'text-amber-400 bg-amber-400/10'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{doc.updated}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-zinc-400 hover:text-zinc-200 transition-colors text-xs font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
