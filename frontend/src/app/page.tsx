"use client";

import React, { useState, useRef, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import Answer from '../components/Answer';
import ComparisonTable from '../components/ComparisonTable';
import ThinkingProcess from '../components/ThinkingProcess';
import ShaderBackground from '../components/ShaderBackground';
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
    <main className="h-screen bg-surface text-on-surface flex flex-col relative overflow-hidden">
      
      {/* Background ambient glow when empty */}
      {conversation.length === 0 && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <ShaderBackground />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-primary-container/15 via-secondary-container/10 to-transparent blur-3xl rounded-full"></div>
          <div className="absolute bottom-24 -right-24 w-96 h-96 bg-primary-container/5 blur-3xl rounded-full"></div>
        </div>
      )}

      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-32 z-10" ref={scrollRef}>
        <div className="max-w-6xl mx-auto flex flex-col gap-8 w-full">
          
          {conversation.length === 0 ? (
            <div className="flex flex-col items-center text-center pt-space-lg w-full">
              <div className="relative flex items-center justify-center mb-space-md group cursor-pointer">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-container/20 to-secondary/25 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-20 h-20 rounded-full bg-surface-container-lowest/80 backdrop-blur-xl flex items-center justify-center shadow-xl">
                  <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                    <circle className="text-primary-container/60" cx="50" cy="50" fill="none" r="46" stroke="currentColor" strokeDasharray="8 14" strokeWidth="1.5"></circle>
                    <circle className="text-secondary/40" cx="50" cy="50" fill="none" r="38" stroke="currentColor" strokeDasharray="4 8" strokeWidth="1"></circle>
                  </svg>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-surface-container-high to-surface-container-lowest flex items-center justify-center shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary-container/10 animate-ping opacity-30"></div>
                    <div className="flex items-end gap-1 h-5 z-10 px-1">
                      <span className="w-1 bg-primary-container rounded-full h-2 animate-[pulse_1s_ease-in-out_infinite]"></span>
                      <span className="w-1 bg-primary rounded-full h-4 animate-[pulse_1.4s_ease-in-out_infinite_200ms]"></span>
                      <span className="w-1 bg-secondary rounded-full h-5 animate-[pulse_1.2s_ease-in-out_infinite_400ms]"></span>
                      <span className="w-1 bg-primary-container rounded-full h-3 animate-[pulse_0.9s_ease-in-out_infinite_100ms]"></span>
                      <span className="w-1 bg-primary rounded-full h-2 animate-[pulse_1.3s_ease-in-out_infinite_300ms]"></span>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-transparent bg-clip-text bg-gradient-to-b from-on-surface via-on-surface to-on-surface-variant max-w-4xl tracking-tight mb-space-sm font-bold">How can I help you today?</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-balance">Ask complex investment policy, tax guidance, and product questions. Grounded strictly in approved material.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md my-space-lg w-full mt-12">
                {suggestions.map((item, idx) => {
                  const colors = [
                    { border: 'from-primary-container via-primary', glow: 'bg-primary-container', textHover: 'group-hover:text-primary', btn: 'group-hover:bg-primary-container group-hover:text-on-primary-container' },
                    { border: 'from-secondary via-secondary-fixed-dim', glow: 'bg-secondary', textHover: 'group-hover:text-secondary', btn: 'group-hover:bg-secondary group-hover:text-on-secondary' },
                    { border: 'from-primary via-primary-container', glow: 'bg-primary', textHover: 'group-hover:text-primary', btn: 'group-hover:bg-primary group-hover:text-on-primary' }
                  ];
                  const color = colors[idx % 3];
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSearch(item.text)}
                      className="group relative rounded-xl bg-surface-container-lowest/80 backdrop-blur-xl p-space-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:bg-surface-container-low/90 shadow-lg cursor-pointer overflow-hidden min-h-[160px] text-left"
                    >
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color.border} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                      <div className={`absolute -right-8 -bottom-8 w-24 h-24 ${color.glow}/10 rounded-full blur-xl group-hover:${color.glow}/20 transition-all`}></div>
                      <div>
                        <h2 className={`font-headline-sm text-headline-sm text-on-surface font-semibold mb-space-xs ${color.textHover} transition-colors`}>{item.title}</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">{item.text}</p>
                      </div>
                      <div className="flex items-center justify-end mt-space-lg pt-space-xs text-on-surface-variant group-hover:text-on-surface">
                        <div className={`w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center ${color.btn} transition-all`}>
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-10 pb-6 px-4 z-20 pointer-events-auto">
        <SearchBox onSearch={handleSearch} isLoading={isLoading} />
        <p className="text-center text-[11px] text-zinc-600 mt-2">
          Responses are generated from approved bank materials. Verification by RM is still required for specific client contexts.
        </p>
      </div>

    </main>
  );
}
