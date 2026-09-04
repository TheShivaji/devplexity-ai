import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Trash2, LogOut, X, Sparkles } from 'lucide-react';
import { setCurrentChatId } from '../chat.slice';

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  chats,
  openChat,
  handleDeleteChat,
  handleLogout
}) => {
  const dispatch = useDispatch();
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  const handleNewChat = () => {
    dispatch(setCurrentChatId(null));
    openChat(null);
    setSidebarOpen(false);
  };

  const chatList = Object.values(chats || {});

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-30 bg-black/80 backdrop-blur-xs md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-full z-40
          w-[250px] shrink-0 flex flex-col
          bg-[#050507] border-r border-white/[0.04]
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        {/* Brand & New Thread */}
        <div className="px-4 pt-4 pb-3 border-b border-white/[0.04] flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-200 shrink-0">
                <Sparkles className="w-3 h-3 text-blue-400" />
              </div>
              <span className="font-display text-[15px] font-bold tracking-tight text-white">
                Devplexity<span className="text-blue-400">.ai</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="md:hidden text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleNewChat}
            className="w-full flex items-center justify-start gap-2 px-3 py-2 rounded-xl bg-[#121216] border border-white/[0.06] hover:bg-[#18181f] hover:border-white/10 text-zinc-200 text-[12.5px] font-medium transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <Plus className="w-3.5 h-3.5 text-zinc-400" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Thread History */}
        <div className="flex-1 overflow-y-auto px-2 py-3 scrollbar-thin scrollbar-thumb-white/[0.04]">
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest px-2.5 mb-1.5">
            Recents
          </p>

          {chatList.length === 0 ? (
            <div className="px-2.5 py-3 text-[12px] text-zinc-600 italic">
              No recent conversations
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {chatList.map((c) => {
                const isActive = currentChatId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      openChat(c.id);
                      setSidebarOpen(false);
                    }}
                    className={`
                      group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg
                      cursor-pointer transition-all duration-150 text-[12.5px]
                      ${isActive
                        ? 'bg-white/[0.08] text-white font-medium'
                        : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'
                      }
                    `}
                  >
                    <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-400' : 'text-zinc-500 group-hover:text-zinc-400'}`} />

                    <span className="truncate flex-1 tracking-tight">
                      {c.title || 'Untitled Chat'}
                    </span>

                    <button
                      type="button"
                      aria-label="Delete conversation"
                      title="Delete thread"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(c.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition-all shrink-0 rounded hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* User Account Footer */}
        <div className="p-2.5 border-t border-white/[0.04] bg-[#030305]">
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sign out of account"
            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 text-[12px] font-medium transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;