"use client";

import React, { useState, KeyboardEvent } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchBox({ onSearch, isLoading }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleSearch = () => {
    if (!query.trim() || isLoading) return;
    
    if (history.length === 0 || history[history.length - 1] !== query) {
      setHistory(prev => [...prev, query]);
    }
    setHistoryIndex(-1);
    onSearch(query);
    setQuery("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && (query === "" || historyIndex !== -1)) {
        e.preventDefault();
        const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setQuery(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex >= 0) {
        e.preventDefault();
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setQuery("");
        } else {
          setHistoryIndex(nextIndex);
          setQuery(history[nextIndex]);
        }
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full relative rounded-2xl bg-surface-container-lowest/90 backdrop-blur-2xl p-space-sm shadow-2xl transition-all border border-surface-container/40">
        <div className="flex items-center justify-between gap-space-sm">
          <div className="flex-1 px-space-md relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHistoryIndex(-1); 
              }}
              onKeyDown={handleKeyDown}
              placeholder={isLoading ? "Processing mandate..." : "Ask a question about tax guidance, policies..."} 
              className="w-full bg-transparent border-0 outline-none text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/60 py-2.5"
              disabled={isLoading}
              autoComplete="off"
            />
          </div>
          <div className="flex items-center gap-space-sm pr-1">
            <button 
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all ${
                isLoading 
                  ? 'bg-surface-container-high text-on-surface-variant'
                  : query.trim() 
                    ? 'bg-gradient-to-r from-primary-container to-primary-fixed-dim text-on-primary shadow-md shadow-primary-container/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span className="material-symbols-outlined text-base font-bold">arrow_upward</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
