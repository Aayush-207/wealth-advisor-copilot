"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SearchBox() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    // simulate network request
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="relative group w-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative flex items-center bg-slate-800 rounded-2xl p-2 shadow-xl ring-1 ring-white/10">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about tax guidance, policies..." 
          className="w-full bg-transparent text-slate-200 placeholder-slate-400 px-4 py-3 outline-none text-lg"
        />
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="ml-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          {loading ? (
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
