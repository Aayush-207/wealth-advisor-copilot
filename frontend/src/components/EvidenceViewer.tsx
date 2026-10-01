"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EvidenceViewerProps {
  isOpen: boolean;
  onClose: () => void;
  citation: any;
}

export default function EvidenceViewer({ isOpen, onClose, citation }: EvidenceViewerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h2 className="text-[17px] font-semibold text-zinc-100">Evidence Viewer</h2>
              <button 
                onClick={onClose}
                className="p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 transition-colors border border-zinc-800"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Original Document</h3>
                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-zinc-200 text-sm font-medium">{citation?.text}</h4>
                    <p className="text-xs text-zinc-500 mt-1">Valid: {citation?.date || 'current period'}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-xs font-medium text-zinc-300 transition-colors shrink-0">
                    PDF
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Cited Passage</h3>
                <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 text-zinc-300 text-sm leading-relaxed relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-zinc-600 rounded-l-xl"></div>
                  <p>
                    ...as detailed in Section 4 of the guidelines, all global equity funds (including Class A and Class I shares) managed under the new wealth structure must disclose exact management fees prior to client commitment. 
                    <mark className="bg-zinc-700/50 text-zinc-200 px-1.5 py-0.5 rounded mx-1">
                      For Class A shares, the standard fee is 1.50%.
                    </mark>
                    Any deviations require explicit RM escalation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-zinc-800 bg-zinc-950">
              <p className="text-xs text-zinc-500 text-center flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Document verified in RAG pipeline
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
