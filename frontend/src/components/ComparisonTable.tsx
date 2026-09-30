"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function ComparisonTable({ data }: { data: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full mt-6 overflow-hidden rounded-2xl border border-slate-700/50 shadow-xl bg-slate-800/80 backdrop-blur-md"
    >
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-900/80 text-slate-300 uppercase text-xs tracking-wider">
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Fee</th>
            <th className="px-6 py-4 font-semibold">Risk Level</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {data.map((row, i) => (
            <motion.tr 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="hover:bg-slate-700/30 transition-colors group"
            >
              <td className="px-6 py-4 text-slate-200 font-medium group-hover:text-teal-300 transition-colors">{row.product}</td>
              <td className="px-6 py-4 text-slate-400">{row.fee}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  row.risk.toLowerCase().includes('high') ? 'bg-red-500/20 text-red-400' :
                  row.risk.toLowerCase().includes('low') ? 'bg-teal-500/20 text-teal-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {row.risk}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
