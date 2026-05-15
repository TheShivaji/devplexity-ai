import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TypingIndicator = () => (
  <div className='flex items-center gap-1 py-1'>
    {[0, 180, 360].map((delay) => (
      <span
        key={delay}
        className='w-[5px] h-[5px] rounded-full bg-white/22 animate-bounce'
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </div>
);

const AIAvatar = () => (
  <div className='w-6 h-6 rounded-[6px] bg-blue-600 flex items-center justify-center shrink-0 mt-0.5'>
    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2.5' strokeLinecap='round'>
      <circle cx='11' cy='11' r='7'/><path d='m21 21-4-4'/>
    </svg>
  </div>
);

const ChatWindow = ({
  currentChatId, chats, isLoading, messagesEndRef,
  chatInput, setChatInput, handleSubmitMessage,
  searchEnable, setSearchEnable
}) => {
  return (
    <>
      {/* Messages */}
      <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/[0.06] scrollbar-track-transparent'>
        <div className='max-w-[740px] mx-auto px-5 py-6 flex flex-col gap-[18px]'>

          {currentChatId && chats[currentChatId]?.messages?.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start gap-2.5'}`}
            >
              {message.role === 'assistant' && <AIAvatar />}

              <div className={`
                ${message.role === 'user'
                  ? 'max-w-[75%] px-[14px] py-[10px] bg-white/[0.06] border border-white/10 rounded-[16px_16px_4px_16px] text-[13.5px] text-white/85'
                  : 'max-w-[85%] text-[13.5px] text-white/72 leading-[1.75]'
                }
              `}>
                {message.role === 'user' ? (
                  <p className='leading-[1.65]'>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                      ul: ({ children }) => <ul className='list-disc pl-5 mb-2 space-y-1'>{children}</ul>,
                      ol: ({ children }) => <ol className='list-decimal pl-5 mb-2 space-y-1'>{children}</ol>,
                      li: ({ children }) => <li className='text-white/65'>{children}</li>,
                      code: ({ inline, children }) =>
                        inline ? (
                          <code className='bg-white/[0.07] px-1.5 py-0.5 rounded-[4px] text-[12px] font-mono text-white/82'>{children}</code>
                        ) : (
                          <code className='text-[12px] font-mono'>{children}</code>
                        ),
                      pre: ({ children }) => (
                        <pre className='bg-[#161616] border border-white/[0.08] px-[14px] py-3 rounded-[9px] overflow-x-auto my-2.5 text-[12px] font-mono leading-[1.7] text-white/75'>
                          {children}
                        </pre>
                      ),
                      strong: ({ children }) => <strong className='font-semibold text-white/88'>{children}</strong>,
                      h1: ({ children }) => <h1 className='text-[15px] font-semibold text-white/88 mb-2 mt-1'>{children}</h1>,
                      h2: ({ children }) => <h2 className='text-[14px] font-semibold text-white/88 mb-1.5 mt-1'>{children}</h2>,
                      h3: ({ children }) => <h3 className='text-[13.5px] font-semibold text-white/82 mb-1 mt-1'>{children}</h3>,
                      blockquote: ({ children }) => (
                        <blockquote className='border-l-2 border-white/15 pl-3 text-white/50 italic my-2'>{children}</blockquote>
                      ),
                      a: ({ href, children }) => (
                        <a href={href} className='text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors'>{children}</a>
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
            <div className='flex justify-start gap-2.5'>
              <AIAvatar />
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Footer input */}
      <footer className='shrink-0 px-4 py-3 bg-[#0f0f0f] border-t border-white/[0.07]'>
        <form onSubmit={handleSubmitMessage} className='max-w-[740px] mx-auto'>
          <div className='bg-[#191919] border border-white/10 focus-within:border-blue-500/30 rounded-[14px] transition-colors duration-200 overflow-hidden'>

            {/* Text row */}
            <div className='flex items-center gap-3 px-[14px] pt-[10px] pb-[8px]'>
              <input
                type='text'
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder='Ask anything...'
                disabled={isLoading}
                className='flex-1 bg-transparent outline-none text-[13.5px] text-white/88 placeholder:text-white/25 tracking-tight disabled:opacity-40'
              />
              <button
                type='submit'
                disabled={!chatInput.trim() || isLoading}
                className='w-[30px] h-[30px] rounded-[8px] bg-white flex items-center justify-center hover:bg-white/90 active:scale-95 transition-all disabled:opacity-25 disabled:cursor-not-allowed shrink-0'
              >
                <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='black' strokeWidth='2.5' strokeLinecap='round'>
                  <line x1='12' y1='19' x2='12' y2='5'/><polyline points='5 12 12 5 19 12'/>
                </svg>
              </button>
            </div>

            {/* Actions row */}
            <div className='flex items-center gap-1.5 px-3 pb-2 border-t border-white/[0.05] pt-2'>
              <button
                type='button'
                onClick={() => setSearchEnable(prev => !prev)}
                className={`
                  flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] border transition-all
                  ${searchEnable
                    ? 'bg-blue-500/10 border-blue-500/22 text-blue-300'
                    : 'bg-transparent border-white/[0.08] text-white/30 hover:text-white/55 hover:bg-white/[0.04]'
                  }
                `}
              >
                <svg width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <circle cx='12' cy='12' r='10'/>
                  <line x1='2' y1='12' x2='22' y2='12'/>
                  <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/>
                </svg>
                {searchEnable ? 'Web search' : 'Web search'}
              </button>
            </div>

          </div>
        </form>
      </footer>
    </>
  );
};

export default ChatWindow;