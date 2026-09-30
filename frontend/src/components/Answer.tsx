"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Answer({ text, citations, needsContext = false }: { text: string, citations: any[], needsContext?: boolean }) {
  const [escalated, setEscalated] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full mt-6 p-6 md:p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl relative overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${needsContext ? 'from-yellow-400 to-orange-500' : 'from-teal-400 to-blue-500'}`}></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${needsContext ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {needsContext ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              )}
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-200">
            {needsContext ? 'More Context Needed' : 'Grounded Answer'}
          </h3>
        </div>
        
        {!needsContext && (
          <button 
            onClick={() => setEscalated(true)}
            className={`text-sm px-3 py-1 rounded-lg border transition-all ${escalated ? 'bg-red-500/20 border-red-500/30 text-red-400 cursor-default' : 'bg-slate-700/30 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-300'}`}
          >
            {escalated ? 'Escalated to Specialist' : 'Report Conflict / Escalate'}
          </button>
        )}
      </div>

      <p className={`text-lg leading-relaxed mb-6 ${needsContext ? 'text-orange-200' : 'text-slate-300'}`}>
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
                <span className="ml-2 text-slate-500 text-xs">(Valid for {c.date || 'current period'})</span>
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
