import React from 'react';

const ModeTabs = ({ mode, setMode }) => {
  return (
    <div className='shrink-0 flex items-center gap-1 px-4 py-[6px] border-b border-white/[0.06] bg-[#0f0f0f]'>
      <button
        type='button'
        onClick={() => setMode('chat')}
        className={`
          flex items-center gap-[5px] px-[11px] py-[5px] rounded-[6px]
          text-[12px] font-medium border transition-all duration-150
          ${mode === 'chat'
            ? 'bg-blue-500/[0.09] border-blue-500/20 text-blue-300'
            : 'bg-transparent border-transparent text-white/28 hover:text-white/55'
          }
        `}
      >
        <svg width='12' height='12' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round'>
          <path d='M14 10.5c0 .8-.7 1.5-1.5 1.5H4L1 15V3.5C1 2.7 1.7 2 2.5 2h10c.8 0 1.5.7 1.5 1.5v7z'/>
        </svg>
        Chat
      </button>

      <button
        type='button'
        onClick={() => setMode('study')}
        className={`
          flex items-center gap-[5px] px-[11px] py-[5px] rounded-[6px]
          text-[12px] font-medium border transition-all duration-150
          ${mode === 'study'
            ? 'bg-purple-500/[0.09] border-purple-500/20 text-purple-300'
            : 'bg-transparent border-transparent text-white/28 hover:text-white/55'
          }
        `}
      >
        <svg width='12' height='12' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round'>
          <path d='M2 3h12M2 7.5h7M2 12h5'/><circle cx='13' cy='11.5' r='2.3'/><path d='m14.6 13.1 1.1 1.1'/>
        </svg>
        Study Mode
      </button>
    </div>
  );
};

export default ModeTabs;