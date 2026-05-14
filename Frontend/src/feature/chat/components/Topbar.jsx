import React from 'react';

const Topbar = ({ setSidebarOpen, currentChatId, chats }) => {
  return (
    <header className='h-14 shrink-0 flex items-center gap-2.5 px-5 border-b border-white/[0.07] bg-[#0a0a0a]/80 backdrop-blur-xl'>
      <button
        onClick={() => setSidebarOpen(true)}
        className='md:hidden mr-1 text-white/50 hover:text-white/80 transition-colors'
      >
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
          <line x1='3' y1='6' x2='21' y2='6' />
          <line x1='3' y1='12' x2='21' y2='12' />
          <line x1='3' y1='18' x2='21' y2='18' />
        </svg>
      </button>
      <div className='w-1.5 h-1.5 rounded-full bg-blue-500' />
      <span className='text-[13px] text-white/55 tracking-tight'>
        {currentChatId
          ? chats[currentChatId]?.title || 'Conversation'
          : 'New Conversation'}
      </span>
    </header>
  );
};

export default Topbar;
