import React from 'react';

const Topbar = ({ setSidebarOpen, currentChatId, chats }) => {
  return (
    <header className='h-[46px] shrink-0 flex items-center gap-2.5 px-5 border-b border-white/[0.07] bg-[#0f0f0f]'>
      <button
        onClick={() => setSidebarOpen(true)}
        className='md:hidden text-white/35 hover:text-white/65 transition-colors mr-1'
      >
        <svg width='17' height='17' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
          <line x1='3' y1='6' x2='21' y2='6'/>
          <line x1='3' y1='12' x2='21' y2='12'/>
          <line x1='3' y1='18' x2='21' y2='18'/>
        </svg>
      </button>
      <div className='w-[5px] h-[5px] rounded-full bg-blue-500 shrink-0' />
      <span className='text-[12.5px] text-white/38 tracking-tight truncate'>
        {currentChatId ? chats[currentChatId]?.title || 'Conversation' : 'New thread'}
      </span>
    </header>
  );
};

export default Topbar;