"use client";

import React from 'react';

export default function ComparisonTable({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full mt-2 overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-900">
      <table className="w-full text-left text-sm text-zinc-300">
        <thead className="bg-zinc-800/50 text-zinc-400 uppercase text-[10px] tracking-wider">
          <tr>
            <th className="px-6 py-3 font-medium">Product</th>
            <th className="px-6 py-3 font-medium">Fee</th>
            <th className="px-6 py-3 font-medium">Risk Level</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
              <td className="px-6 py-4 font-medium">{row.product}</td>
              <td className="px-6 py-4">{row.fee}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-[11px] font-bold ${
                  row.risk.toLowerCase().includes('high') ? 'text-red-400 bg-red-400/10' :
                  row.risk.toLowerCase().includes('low') ? 'text-emerald-400 bg-emerald-400/10' :
                  'text-amber-400 bg-amber-400/10'
                }`}>
                  {row.risk}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
