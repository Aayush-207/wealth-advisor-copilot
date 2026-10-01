"use client";

import React, { useState, useRef, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import Answer from '../components/Answer';
import ComparisonTable from '../components/ComparisonTable';
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
    
    // Simulate 2 second buffer instead of 5-6 to make it snappy but clear
    const waitTime = Math.floor(Math.random() * 500) + 2000; 

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

  return (
    <main className="h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-zinc-800 selection:text-white">
      
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-32" ref={scrollRef}>
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          
          {conversation.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full mt-32 opacity-80">
              <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h1 className="text-3xl font-semibold text-zinc-200 mb-3">How can I help you today?</h1>
              <p className="text-zinc-500 text-sm max-w-md text-center">Ask complex investment policy, tax guidance, and product questions. Grounded strictly in approved material.</p>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start w-full">
              <div className="flex gap-1 items-center bg-zinc-900/50 border border-zinc-800/50 px-4 py-3 rounded-2xl h-12">
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </motion.div>
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
