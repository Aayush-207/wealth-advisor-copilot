"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Answer({ text, citations }: { text: string, citations: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full mt-6 p-6 md:p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-200">Grounded Answer</h3>
      </div>

      <p className="text-slate-300 text-lg leading-relaxed mb-6">
        {text}
      </p>

      {citations && citations.length > 0 && (
        <div className="pt-4 border-t border-slate-700/50">
          <h4 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Sources & Evidence</h4>
          <div className="flex flex-col gap-2">
            {citations.map((c, i) => (
              <motion.a 
                key={i}
                whileHover={{ x: 4 }}
                href="#"
                className="inline-flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors bg-slate-900/50 px-3 py-2 rounded-lg w-fit border border-teal-500/20 hover:border-teal-500/40"
              >
                <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-2 py-0.5 rounded">[{i + 1}]</span>
                {c.text}
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
