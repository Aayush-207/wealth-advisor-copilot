"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThinkingProcess() {
  const steps = [
    "Analyzing query intent...",
    "Searching approved bank materials...",
    "Extracting relevant context...",
    "Verifying compliance rules...",
    "Formulating response..."
  ];
  
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 700 + Math.random() * 800); // Random duration between 0.7s and 1.5s
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex justify-start w-full mb-2 pl-4"
    >
      <div className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
        <svg className="animate-spin h-4 w-4 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <AnimatePresence mode="wait">
          <motion.span 
            key={currentStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {steps[currentStep]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
