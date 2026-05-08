import React, { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useSelector } from 'react-redux'
import { useChat } from '../hook/useChat.js'

const TypingIndicator = () => (
  <div className='flex items-center gap-1.5 px-4 py-3 rounded-[4px_18px_18px_18px] bg-[#111111] border border-white/[0.07] w-fit'>
    <span className='w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce' style={{ animationDelay: '0ms' }} />
    <span className='w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce' style={{ animationDelay: '180ms' }} />
    <span className='w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce' style={{ animationDelay: '360ms' }} />
  </div>
)

const Dashboard = () => {
  const chat = useChat()

  const [chatInput, setChatInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    chat.initlizeSocket()
    chat.handleGetChats()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, isLoading])

  const handleSubmitMessage = async (event) => {
    event.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) return
    setIsLoading(true)
    setChatInput('')
    try {
      await chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    } finally {
      setIsLoading(false)
    }
  }

  const openChat = (chatId) => {
    if (!chatId) return
    chat.handleOpenChat(chatId, chats)
    setSidebarOpen(false)
  }

  return (
    <main className='h-screen bg-[#0a0a0a] text-white overflow-hidden flex font-sans'>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/60 z-10 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
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
            Chat<span className='text-blue-400'>AI</span>
          </span>
        </div>

        {/* Chat list */}
        <div className='flex-1 overflow-y-auto px-2 py-3 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent'>
          {Object.values(chats).map((c, index) => (
            <button
              key={index}
              onClick={() => openChat(c.id)}
              className={`
                w-full text-left px-3 py-2.5 rounded-[10px]
                text-[13px] tracking-tight
                transition-all duration-150
                border
                ${currentChatId === c.id
                  ? 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                  : 'bg-transparent border-transparent text-white/45 hover:bg-white/[0.05] hover:text-white/80'
                }
              `}
            >
              <span className='truncate block'>{c.title}</span>
            </button>
          ))}
        </div>

        {/* New chat */}
        <div className='p-2 border-t border-white/[0.07]'>
          <button className='w-full flex items-center justify-center gap-2 rounded-[10px] bg-transparent hover:bg-white/[0.05] border border-white/[0.10] text-white/50 hover:text-white/80 py-2.5 text-[13px] tracking-tight transition-all duration-150'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='12' y1='5' x2='12' y2='19' />
              <line x1='5' y1='12' x2='19' y2='12' />
            </svg>
            New chat
          </button>
        </div>
      </aside>

      {/* ── Main panel ── */}
      <section className='flex flex-1 flex-col min-w-0 h-full'>

        {/* Topbar */}
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

        {/* Messages */}
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

        {/* Input footer */}
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

      </section>
    </main>
  )
}

export default Dashboard