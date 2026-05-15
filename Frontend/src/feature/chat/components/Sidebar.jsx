import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useChat } from '../hook/useChat';
import { setCurrentChatId } from '../chat.slice';

const Sidebar = ({ sidebarOpen, setSidebarOpen, chats, openChat, handleDeleteChat, handleLogout }) => {
const chat = useChat();
const currentChatId = useSelector((state) => state.chat.currentChatId);
  const dispatch = useDispatch();
  const handleNewChat = () => {
    dispatch(setCurrentChatId(null));
    openChat(null);
    setSidebarOpen(false);
  };
  return (
    <>
      {sidebarOpen && (
        <div className='fixed inset-0 z-10 bg-black/50 md:hidden' onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`
        fixed md:relative top-0 left-0 h-full z-20
        w-[200px] shrink-0 flex flex-col
        bg-[#0f0f0f] border-r border-white/[0.08]
        transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>

        {/* Top */}
        <div className='px-3 pt-3.5 pb-2.5 border-b border-white/[0.06]'>
          {/* Logo */}
          <div className='flex items-center gap-2 mb-3'>
            <div className='w-[22px] h-[22px] rounded-[6px] bg-blue-600 flex items-center justify-center shrink-0'>
              <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2.5' strokeLinecap='round'>
                <circle cx='11' cy='11' r='7'/><path d='m21 21-4-4'/>
              </svg>
            </div>
            <span className='text-[13px] font-semibold tracking-tight text-white/90'>
              Devplexity
            </span>
          </div>

          {/* New thread */}
          <button
            onClick={() => { openChat(null); setSidebarOpen(false); }}
            className='w-full flex items-center gap-2 px-2.5 py-[7px] rounded-[8px] bg-white/[0.05] border border-white/[0.08] text-white/55 hover:bg-white/[0.08] hover:text-white/80 text-[12px] transition-all'
          >
            <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <line x1='12' y1='5' x2='12' y2='19'/><line x1='5' y1='12' x2='19' y2='12'/>
            </svg>
            New thread
          </button>
        </div>

        {/* Chat list */}
        <div className='flex-1 overflow-y-auto px-3 py-2.5 scrollbar-thin scrollbar-thumb-white/[0.06] scrollbar-track-transparent'>
          <p className='text-[10px] text-white/22 uppercase tracking-widest mb-1.5 px-1'>Recent</p>
          <div className='flex flex-col gap-px'>
            {Object.values(chats).map((c) => (
              <div
                key={c.id}
                onClick={() => { openChat(c.id); setSidebarOpen(false); }}
                className={`
                  group flex items-center justify-between px-2 py-[6px] rounded-[7px]
                  border cursor-pointer transition-all duration-150
                  ${currentChatId === c.id
                    ? 'bg-white/[0.07] border-white/[0.09] text-white/85'
                    : 'border-transparent text-white/42 hover:bg-white/[0.04] hover:text-white/70'
                  }
                `}
              >
                <span className='truncate text-[12px] tracking-tight flex-1 pr-1'>{c.title}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteChat(c.id); }}
                  className='opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all shrink-0'
                >
                  <svg width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
                    <path d='M18 6L6 18M6 6l12 12'/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}

        
        <div className='px-3 py-2.5 border-t border-white/[0.06] flex flex-col gap-2'>
        
        <button 
          onClick={() => handleNewChat()}
          className='w-full flex items-center gap-2 px-2.5 py-[7px] rounded-[8px] border bg-transparent hover:text-white/90 text-[12px] transition-all cursor-pointer hover:bg-white/[0.05] hover:border-white/[0.10] text-white/70 hover:text-white/90 py-2.5 text-[13px] font-medium tracking-tight transition-all duration-150'
        >
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <line x1='12' y1='5' x2='12' y2='19' />
            <line x1='5' y1='12' x2='19' y2='12' />
          </svg>
          New chat
        </button>
          <button
            onClick={handleLogout}
            className='w-full flex items-center gap-2 px-2.5 py-[7px] rounded-[8px] border border-red-500/[0.15] bg-transparent text-red-400/60 hover:bg-red-500/[0.08] hover:text-red-400 text-[12px] transition-all'
          >
            <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'/>
              <polyline points='16 17 21 12 16 7'/>
              <line x1='21' y1='12' x2='9' y2='12'/>
            </svg>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;