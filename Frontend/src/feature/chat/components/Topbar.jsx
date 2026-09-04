import React from 'react';
import { Menu, Sparkles } from 'lucide-react';

const Topbar = ({ setSidebarOpen, currentChatId, chats }) => {
  const activeTitle = currentChatId ? chats[currentChatId]?.title || 'Conversation' : 'New Chat';

  return (
    <header className="h-[44px] shrink-0 flex items-center justify-between px-4 border-b border-white/[0.05] bg-[#09090b]">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar menu"
          className="md:hidden p-1 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-white/[0.06]"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
          <span className="text-[12.5px] font-medium text-zinc-400 truncate tracking-tight">
            {activeTitle}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/[0.08] border border-purple-500/15 text-[11px] font-medium text-purple-300">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Devplexity AI</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;