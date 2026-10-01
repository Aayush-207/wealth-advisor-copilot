"use client";

import React, { useState, KeyboardEvent } from 'react';
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
    <div className="relative group w-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative flex items-center bg-slate-800 rounded-2xl p-2 shadow-xl ring-1 ring-white/10">
        <input 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHistoryIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about tax guidance, policies..." 
          className="w-full bg-transparent text-slate-200 placeholder-slate-400 px-4 py-3 outline-none text-lg"
          disabled={isLoading}
        />
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          disabled={isLoading}
          className={`ml-2 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all ${isLoading ? 'bg-slate-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:shadow-lg'}`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking
            </span>
          ) : 'Ask'}
        </motion.button>
      </div>
    </div>
  );
}
