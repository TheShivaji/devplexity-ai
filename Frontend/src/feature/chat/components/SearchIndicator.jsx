import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Loader2 } from 'lucide-react';

const SearchIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[12px] text-zinc-300 w-fit mb-2"
    >
      <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />
      <Globe className="w-3.5 h-3.5 text-zinc-400" />
      <span className="font-medium tracking-tight">Searching live web sources...</span>
    </motion.div>
  );
};

export default SearchIndicator;
