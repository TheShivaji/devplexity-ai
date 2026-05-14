import React from 'react';

const ModeTabs = ({ mode, setMode }) => {
  return (
    <div className='shrink-0 flex items-center gap-1 px-5 py-2.5 border-b border-white/[0.07] bg-[#0a0a0a]'>
      <button
        type='button'
        onClick={() => setMode('chat')}
        className={`
          px-3.5 py-1.5 rounded-[8px] text-[13px] font-medium tracking-tight
          transition-all duration-150 border
          ${mode === 'chat'
            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
            : 'bg-transparent border-transparent text-white/35 hover:text-white/60'
          }
        `}
      >
        💬 Chat
      </button>
      <button
        type='button'
        onClick={() => setMode('study')}
        className={`
          px-3.5 py-1.5 rounded-[8px] text-[13px] font-medium tracking-tight
          transition-all duration-150 border
          ${mode === 'study'
            ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
            : 'bg-transparent border-transparent text-white/35 hover:text-white/60'
          }
        `}
      >
        📚 Study Mode
      </button>
    </div>
  );
};

export default ModeTabs;
