"use client";

import React, { useState, KeyboardEvent, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    
    // Add to history if it's not the same as the last query
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
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setQuery(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
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
    <div className="w-full max-w-4xl mx-auto px-4 pb-6">
      <div className="relative flex items-center bg-zinc-900 border border-zinc-800 focus-within:border-zinc-700 focus-within:bg-zinc-800/80 rounded-2xl p-2 shadow-sm transition-all duration-300">
        <input 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHistoryIndex(-1); // reset history nav if user types
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about tax guidance, policies..." 
          className="w-full bg-transparent text-zinc-200 placeholder-zinc-500 px-4 py-3 outline-none text-[15px]"
          disabled={isLoading}
          autoComplete="off"
        />
        <button 
          onClick={handleSearch}
          disabled={isLoading || !query.trim()}
          className={`ml-2 p-3 rounded-xl transition-all flex items-center justify-center ${
            isLoading ? 'text-zinc-500' : query.trim() ? 'bg-zinc-200 text-zinc-900 hover:bg-white' : 'text-zinc-600 bg-zinc-800'
          }`}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
