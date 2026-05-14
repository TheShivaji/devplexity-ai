import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TypingIndicator = () => (
  <div className='flex items-center gap-1.5 px-4 py-3 rounded-[4px_18px_18px_18px] bg-[#111111] border border-white/[0.07] w-fit'>
    <span className='w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce' style={{ animationDelay: '0ms' }} />
    <span className='w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce' style={{ animationDelay: '180ms' }} />
    <span className='w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce' style={{ animationDelay: '360ms' }} />
  </div>
);

const ChatWindow = ({
  currentChatId,
  chats,
  isLoading,
  messagesEndRef,
  chatInput,
  setChatInput,
  handleSubmitMessage,
  searchEnable,
  setSearchEnable
}) => {
  return (
    <>
      <div className='flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent'>
        <div className='max-w-[760px] mx-auto px-5 py-7 flex flex-col gap-5'>

          {currentChatId &&
            chats[currentChatId]?.messages?.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] md:max-w-[75%]
                    px-4 py-3.5
                    text-[14.5px] leading-[1.75] tracking-tight
                    ${message.role === 'user'
                      ? 'bg-blue-500/10 border border-blue-500/20 text-white/90 rounded-[18px_18px_4px_18px]'
                      : 'bg-[#111111] border border-white/[0.07] text-white/80 rounded-[4px_18px_18px_18px]'
                    }
                  `}
                >
                  {message.role === 'user' ? (
                    <p>{message.content}</p>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => (
                          <p className='mb-2.5 last:mb-0'>{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className='list-disc pl-5 mb-2.5 space-y-1'>{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className='list-decimal pl-5 mb-2.5 space-y-1'>{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className='text-white/75'>{children}</li>
                        ),
                        code: ({ inline, children }) =>
                          inline ? (
                            <code className='bg-white/[0.08] px-1.5 py-0.5 rounded-[5px] text-[12.5px] font-mono text-white/85'>
                              {children}
                            </code>
                          ) : (
                            <code className='text-[12.5px] font-mono'>{children}</code>
                          ),
                        pre: ({ children }) => (
                          <pre className='bg-[#0d0d0d] border border-white/[0.07] px-4 py-3.5 rounded-[10px] overflow-x-auto my-3 text-[12.5px] font-mono leading-relaxed'>
                            {children}
                          </pre>
                        ),
                        strong: ({ children }) => (
                          <strong className='font-semibold text-white/90'>{children}</strong>
                        ),
                        h1: ({ children }) => (
                          <h1 className='text-[16px] font-semibold text-white/90 mb-2 mt-1'>{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className='text-[15px] font-semibold text-white/90 mb-2 mt-1'>{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className='text-[14px] font-semibold text-white/85 mb-1.5 mt-1'>{children}</h3>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className='border-l-2 border-blue-500/40 pl-3 text-white/60 italic my-2'>
                            {children}
                          </blockquote>
                        ),
                        a: ({ href, children }) => (
                          <a href={href} className='text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors'>
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

          {isLoading && (
            <div className='flex justify-start'>
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <footer className='shrink-0 border-t border-white/[0.07] bg-[#0a0a0a] px-5 py-3.5'>
        <form onSubmit={handleSubmitMessage} className='max-w-[760px] mx-auto'>
          <div className='flex items-center gap-2.5 bg-[#111111] border border-white/[0.12] focus-within:border-blue-500/35 rounded-[14px] px-4 py-2 transition-colors duration-200'>
            <input
              type='text'
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder='Ask anything...'
              disabled={isLoading}
              className='flex-1 bg-transparent outline-none text-[14px] text-white/90 placeholder:text-white/28 tracking-tight disabled:opacity-40'
            />
            <button
              type='button'
              onClick={() => setSearchEnable(prev => !prev)}
              title={searchEnable ? 'Web Search ON' : 'Web Search OFF'}
              className={`
                shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px]
                text-[12px] font-medium tracking-tight border
                transition-all duration-200
                ${searchEnable
                  ? 'bg-blue-500/15 border-blue-500/30 text-blue-400'
                  : 'bg-transparent border-white/10 text-white/30 hover:text-white/50'
                }
              `}
            >
              <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <circle cx='11' cy='11' r='8' />
                <line x1='21' y1='21' x2='16.65' y2='16.65' />
              </svg>
              {searchEnable ? 'Web On' : 'Web'}
            </button>

            <button
              type='submit'
              disabled={!chatInput.trim() || isLoading}
              className='h-9 px-5 rounded-[9px] bg-white text-black text-[13px] font-medium hover:bg-white/90 active:scale-[0.97] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed shrink-0'
            >
              {isLoading ? (
                <span className='flex items-center gap-1.5'>
                  <span className='w-1 h-1 rounded-full bg-black/50 animate-bounce' style={{ animationDelay: '0ms' }} />
                  <span className='w-1 h-1 rounded-full bg-black/50 animate-bounce' style={{ animationDelay: '150ms' }} />
                  <span className='w-1 h-1 rounded-full bg-black/50 animate-bounce' style={{ animationDelay: '300ms' }} />
                </span>
              ) : 'Send'}
            </button>
          </div>
        </form>
      </footer>
    </>
  );
};

export default ChatWindow;
