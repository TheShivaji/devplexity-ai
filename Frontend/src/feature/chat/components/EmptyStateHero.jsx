import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const PROMPT_PILLS = [
  {
    title: 'Quantum Computing',
    prompt: 'Explain the core principles of quantum computing and qubits in simple terms.',
  },
  {
    title: 'React vs Vue Ecosystem',
    prompt: 'Compare React and Vue ecosystem performance, state management, and modern trends.',
  },
  {
    title: 'System Design Architecture',
    prompt: 'How to architect a real-time collaborative code editor using WebSockets and Redis?',
  },
  {
    title: 'Clean Energy Breakthroughs',
    prompt: 'What are the latest technological breakthroughs in clean energy and battery storage?',
  }
];

const EmptyStateHero = ({ onSelectPrompt }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 max-w-2xl mx-auto text-center my-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col items-center gap-3.5 mb-10"
      >
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-1 shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-400" />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
          What can I help you explore?
        </h1>
        <p className="text-[13.5px] sm:text-[14.5px] text-zinc-400 max-w-md leading-relaxed">
          Ask complex questions, analyze code, or synthesize live web research.
        </p>
      </motion.div>

      {/* Suggestion Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-left"
      >
        {PROMPT_PILLS.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelectPrompt(item.prompt)}
            aria-label={`Select prompt: ${item.title}`}
            className="group flex items-start justify-between p-4 rounded-2xl bg-[#0e0e11] border border-white/[0.05] hover:border-white/15 hover:bg-[#141418] transition-all duration-200 text-left focus:outline-none focus:ring-1 focus:ring-blue-500/40 cursor-pointer"
          >
            <div className="flex flex-col gap-1 pr-2">
              <span className="text-[13.5px] font-semibold text-zinc-100 group-hover:text-white transition-colors">
                {item.title}
              </span>
              <span className="text-[12px] text-zinc-400 line-clamp-1 leading-normal">
                {item.prompt}
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors shrink-0 mt-0.5" />
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default EmptyStateHero;
