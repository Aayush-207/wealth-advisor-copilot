"use client";

import React, { useState, useRef, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import Answer from '../components/Answer';
import ComparisonTable from '../components/ComparisonTable';
import ThinkingProcess from '../components/ThinkingProcess';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation, isLoading]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    
    // Append user query to conversation
    setConversation(prev => [...prev, { role: 'user', content: query }]);
    
    // Simulate 7.5 - 9 second buffer to allow thinking steps to play out slowly
    const waitTime = Math.floor(Math.random() * 1500) + 7500; 

    setTimeout(() => {
      setIsLoading(false);
      
      const lowerQuery = query.toLowerCase();
      let newAnswers = [];

      if (lowerQuery.includes('capital gains') || lowerQuery.includes('mutual funds')) {
        newAnswers.push({
          type: 'answer',
          text: "Based on the recent updates to the Income-tax Act, 2025, the sale of equity mutual funds is subject to Long-Term Capital Gains (LTCG) tax if the units have been held for a period exceeding 12 months. Currently, the LTCG tax rate is set at 12.5% for gains exceeding ₹1.25 lakh in a financial year.\n\nFor short-term holdings (less than 12 months), the Short-Term Capital Gains (STCG) tax rate applies at 20%.\n\nPlease ensure you verify the client's current tax residency and any grandfathering clauses that may apply to investments made prior to 2018.",
          citations: [{text: "Income Tax Department FAQs 2026", date: "April 2026 - Present"}],
          needsContext: false
        });
      } else if (lowerQuery.includes('fee') && lowerQuery.includes('equity fund')) {
        newAnswers.push({
          type: 'answer',
          text: "To determine the exact fee structure for the 'Global Equity Fund', I need the specific share class and jurisdiction. \n\nDifferent share classes bear different management fee ratios and ongoing charges figures (OCF). For example, Class A shares are typically intended for retail investors, whereas Class I shares are strictly for institutional clients and have a lower fee structure.\n\nAre you referring to Class A or Class I shares?",
          citations: [],
          needsContext: true
        });
        newAnswers.push({
          type: 'table',
          data: [
            { product: "Global Equity Fund (Class A)", fee: "1.50%", risk: "High" },
            { product: "Stable Income Bond Fund", fee: "0.45%", risk: "Low" }
          ]
        });
      } else {
        newAnswers.push({
          type: 'answer',
          text: "I could not find specific information for your query in the approved bank material. Please try rephrasing or ask a different question.",
          citations: [],
          needsContext: false
        });
      }

      setConversation(prev => [...prev, { role: 'ai', content: newAnswers }]);
    }, waitTime);
  };

  const suggestions = [
    { title: "Capital Gains Tax", text: "What is the capital gains tax for equity mutual funds?" },
    { title: "Fee Structures", text: "Fee structure for Global Equity Fund" },
    { title: "Compliance", text: "Are there any constraints for offshore trusts?" }
  ];

  return (
    <main className="h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-zinc-800 selection:text-white relative overflow-hidden">
      
      {/* Background ambient glow when empty */}
      {conversation.length === 0 && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"
          />
        </div>
      )}

      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-32 z-10" ref={scrollRef}>
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          
          {conversation.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full mt-24">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-zinc-800/20 to-zinc-500/10 blur-sm pointer-events-none"></div>
                <svg className="w-8 h-8 text-zinc-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </motion.div>
              <motion.h1 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-3xl font-semibold text-zinc-100 mb-3"
              >
                How can I help you today?
              </motion.h1>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-zinc-500 text-sm max-w-md text-center mb-10"
              >
                Ask complex investment policy, tax guidance, and product questions. Grounded strictly in approved material.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                {suggestions.map((item, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    onClick={() => handleSearch(item.text)}
                    className="flex flex-col items-start p-4 bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl text-left transition-all group"
                  >
                    <span className="text-zinc-300 font-medium text-sm mb-2 flex items-center justify-between w-full">
                      {item.title}
                      <svg className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <span className="text-zinc-500 text-xs line-clamp-2">{item.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            conversation.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'user' ? (
                  <div className="bg-zinc-800 text-zinc-100 px-5 py-3 rounded-2xl max-w-[80%] md:max-w-[70%] leading-relaxed text-[15px]">
                    {msg.content}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 w-full max-w-[90%] md:max-w-[85%]">
                    {msg.content.map((item: any, idx: number) => {
                      if (item.type === 'answer') {
                        return <Answer key={idx} needsContext={item.needsContext} text={item.text} citations={item.citations} />;
                      } else if (item.type === 'table') {
                        return <ComparisonTable key={idx} data={item.data} />;
                      }
                      return null;
                    })}
                  </div>
                )}
              </motion.div>
            ))
          )}
          
          {isLoading && (
            <ThinkingProcess />
          )}

        </div>
      </div>

      {/* Fixed Bottom Input */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-10 pb-6 px-4">
        <SearchBox onSearch={handleSearch} isLoading={isLoading} />
        <p className="text-center text-[11px] text-zinc-600 mt-2">
          Responses are generated from approved bank materials. Verification by RM is still required for specific client contexts.
        </p>
      </div>

    </main>
  );
}
