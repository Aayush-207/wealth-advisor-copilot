"use client";

import React, { useEffect, useRef } from 'react';
import SearchBox from '../components/SearchBox';
import Answer from '../components/Answer';
import ComparisonTable from '../components/ComparisonTable';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Home() {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start p-8 md:p-24 selection:bg-blue-500 selection:text-white pb-32">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        
        <header ref={headerRef} className="flex flex-col items-center text-center gap-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-teal-400 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center mb-4"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            Wealth Advisor Copilot
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl">
            Ask complex investment policy, tax guidance, and product questions. Get answers grounded strictly in approved bank material.
          </p>
        </header>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full mt-8 sticky top-24 z-40"
        >
          <SearchBox />
        </motion.div>

        <div className="flex flex-col gap-6 mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Answer 
              text="Based on the Income-tax Act, 2025, the sale of equity mutual funds is subject to long-term capital gains tax if held for over 12 months. Please verify the client's tax residency." 
              citations={[{text: "Income Tax Department FAQs 2026", date: "April 2026 - Present"}]} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <Answer 
              needsContext={true}
              text="To determine the exact fee structure for the 'Global Equity Fund', I need the specific share class and jurisdiction. Are you referring to Class A or Class I shares?" 
              citations={[]} 
            />
          </motion.div>
          
          <ComparisonTable 
            data={[
              { product: "Global Equity Fund (Class A)", fee: "1.50%", risk: "High" },
              { product: "Stable Income Bond Fund", fee: "0.45%", risk: "Low" }
            ]} 
          />
        </div>
      </div>
    </main>
  );
}
