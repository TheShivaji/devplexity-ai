import React from 'react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, chats, currentChatId, openChat, handleDeleteChat, handleLogout }) => {
  return (
    <aside
      className={`
        fixed md:relative top-0 left-0 h-full z-20
        w-64 shrink-0 flex flex-col
        bg-[#111111]
        border-r border-white/[0.07]
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      {/* Logo */}
      <div className='flex items-center gap-2.5 px-4 py-[18px] border-b border-white/[0.07]'>
        <div className='w-2 h-2 rounded-full bg-blue-500' />
        <span className='text-[15px] font-semibold tracking-tight text-white/90'>
          Devplexity<span className='text-blue-400'>AI</span>
        </span>
      </div>

      {/* Chat list */}
      <div className='flex-1 overflow-y-auto px-2 py-3 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent'>
        {Object.values(chats).map((c, index) => (
          <div
            key={index}
            onClick={() => openChat(c.id)}
            className={`
              group flex items-center justify-between w-full px-3 py-2.5 rounded-[10px]
              text-[13px] tracking-tight
              transition-all duration-150
              border cursor-pointer
              ${currentChatId === c.id
                ? 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                : 'bg-transparent border-transparent text-white/45 hover:bg-white/[0.05] hover:text-white/80'
              }
            `}
          >
            <span className='truncate flex-1 pr-2'>{c.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteChat(c.id);
              }}
              className='text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0'
              title="Delete chat"
            >
              <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className='p-3 border-t border-white/[0.07] flex flex-col gap-2.5'>
        <button 
          onClick={() => openChat(null)}
          className='w-full flex items-center justify-center gap-2 rounded-[10px] bg-transparent hover:bg-white/[0.05] border border-white/[0.10] text-white/70 hover:text-white/90 py-2.5 text-[13px] font-medium tracking-tight transition-all duration-150'
        >
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <line x1='12' y1='5' x2='12' y2='19' />
            <line x1='5' y1='12' x2='19' y2='12' />
          </svg>
          New chat
        </button>

        <button
          onClick={handleLogout}
          className='w-full flex items-center justify-center gap-2 rounded-[10px] bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 py-2.5 text-[13px] font-medium tracking-tight transition-all duration-150 group'
        >
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap="round" strokeLinejoin="round" className='group-hover:-translate-x-0.5 transition-transform'>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
