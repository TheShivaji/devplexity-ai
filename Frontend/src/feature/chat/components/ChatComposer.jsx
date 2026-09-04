import React, { useRef, useEffect, useState } from 'react';
import { Globe, ArrowUp, GraduationCap } from 'lucide-react';

const ChatComposer = ({
  chatInput,
  setChatInput,
  handleSubmitMessage,
  isLoading,
  searchEnable,
  setSearchEnable,
  studyEnable,
  setStudyEnable
}) => {
  const textareaRef = useRef(null);
  const [isComposing, setIsComposing] = useState(false);

  // Auto-grow textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = `${newHeight}px`;
  }, [chatInput]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      if (chatInput.trim() && !isLoading) {
        handleSubmitMessage(e);
      }
    }
  };

  return (
    <footer className="shrink-0 px-4 pb-4 pt-1 bg-[#050507]">
      <form onSubmit={handleSubmitMessage} className="max-w-3xl mx-auto">
        <div className="bg-[#121216] border border-white/[0.08] focus-within:border-white/20 rounded-2xl shadow-xl transition-all duration-200 overflow-hidden flex flex-col">

          {/* Text Area */}
          <div className="px-4 pt-3.5 pb-2 flex items-start gap-2">
            <textarea
              ref={textareaRef}
              rows={1}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder="Ask anything or search... (Shift+Enter for newline)"
              disabled={isLoading}
              aria-label="Chat Message Input"
              className="flex-1 bg-transparent outline-none resize-none text-[13.5px] text-zinc-100 placeholder:text-zinc-500 leading-relaxed min-h-[26px] max-h-[200px] scrollbar-thin scrollbar-thumb-white/10"
            />

            <button
              type="submit"
              disabled={!chatInput.trim() || isLoading}
              aria-label="Send message"
              title="Send message"
              className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-20 disabled:cursor-not-allowed shrink-0 mt-0.5"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Capabilities Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 border-t border-white/[0.04] bg-[#0b0b0e]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchEnable((prev) => !prev)}
                aria-label="Toggle web search"
                className={`
                  flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-medium border transition-all duration-150 cursor-pointer
                  ${searchEnable
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                    : 'bg-transparent border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }
                `}
              >
                <Globe className={`w-3.5 h-3.5 ${searchEnable ? 'text-blue-400' : 'text-zinc-400'}`} />
                <span>Web search</span>
                <span className={`w-1.5 h-1.5 rounded-full ${searchEnable ? 'bg-blue-400 animate-pulse' : 'bg-zinc-600'}`} />
              </button>
              
              <button
                type="button"
                onClick={() => setStudyEnable((prev) => !prev)}
                aria-label="Toggle study mode"
                className={`
                  flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-medium border transition-all duration-150 cursor-pointer
                  ${studyEnable
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                    : 'bg-transparent border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }
                `}
              >
                <GraduationCap className={`w-3.5 h-3.5 ${studyEnable ? 'text-blue-400' : 'text-zinc-400'}`} />
                <span>Study mode</span>
                <span className={`w-1.5 h-1.5 rounded-full ${studyEnable ? 'bg-blue-400 animate-pulse' : 'bg-zinc-600'}`} />
              </button>
            </div>

            <div className="text-[11px] text-zinc-500 hidden sm:block">
              <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded border border-white/10 font-mono text-[10px]">Enter</kbd> to send
            </div>
          </div>

        </div>
      </form>
    </footer>
  );
};

export default ChatComposer;
