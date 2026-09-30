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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-slate-800 border-l border-slate-700 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-bold text-white">Evidence Viewer</h2>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Original Document</h3>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/50 flex justify-between items-center">
                  <div>
                    <h4 className="text-teal-400 font-semibold">{citation?.text}</h4>
                    <p className="text-sm text-slate-500 mt-1">Valid: {citation?.date || 'current period'}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm font-medium text-slate-300 transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Cited Passage</h3>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700/50 text-slate-300 leading-relaxed relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 rounded-l-xl"></div>
                  <p>
                    ...as detailed in Section 4 of the guidelines, all global equity funds (including Class A and Class I shares) managed under the new wealth structure must disclose exact management fees prior to client commitment. 
                    <mark className="bg-teal-500/30 text-teal-200 px-1 rounded mx-1">
                      For Class A shares, the standard fee is 1.50%.
                    </mark>
                    Any deviations require explicit RM escalation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-700/50 bg-slate-800/80">
              <p className="text-sm text-slate-400 text-center">
                This document is verified and active in the RAG pipeline.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
