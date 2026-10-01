"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EvidenceViewer from './EvidenceViewer';

export default function Answer({ text, citations, needsContext = false }: { text: string, citations: any[], needsContext?: boolean }) {
  const [escalated, setEscalated] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<any>(null);

  return (
    <>
      <div className="w-full flex flex-col gap-3">
        {needsContext && (
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm font-medium">More Context Needed</span>
          </div>
        )}

        <div className="text-[15px] leading-relaxed text-zinc-300">
          {text}
        </div>

        {!needsContext && (
          <div className="flex justify-end mt-1">
            <button 
              onClick={() => setEscalated(true)}
              className={`text-[11px] px-2 py-1 rounded transition-colors ${escalated ? 'text-red-400 bg-red-400/10 cursor-default' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'}`}
            >
              {escalated ? 'Escalated to Specialist' : 'Flag Issue'}
            </button>
          </div>
        )}

        {citations && citations.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {citations.map((c, i) => (
              <button 
                key={i}
                onClick={() => setSelectedCitation(c)}
                className="inline-flex items-center gap-1.5 text-[12px] text-zinc-400 hover:text-zinc-200 transition-colors bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-2.5 py-1 rounded-md"
              >
                <span className="text-zinc-500 font-mono">[{i + 1}]</span>
                {c.text}
              </button>
            ))}
          </div>
        )}
      </div>

      <EvidenceViewer 
        isOpen={!!selectedCitation} 
        onClose={() => setSelectedCitation(null)} 
        citation={selectedCitation} 
      />
    </>
  );
}
