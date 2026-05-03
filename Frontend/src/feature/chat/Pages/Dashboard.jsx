import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSelector } from 'react-redux'
import { useChat } from '../hook/useChat.js'

// Typing animation component
const TypingIndicator = () => (
  <div className='mr-auto rounded-2xl rounded-bl-[4px] bg-white/[0.04] border border-white/[0.07] px-4 py-3 flex items-center gap-1.5'>
    <span className='w-2 h-2 rounded-full bg-white/40 animate-bounce' style={{ animationDelay: '0ms' }} />
    <span className='w-2 h-2 rounded-full bg-white/40 animate-bounce' style={{ animationDelay: '150ms' }} />
    <span className='w-2 h-2 rounded-full bg-white/40 animate-bounce' style={{ animationDelay: '300ms' }} />
  </div>
)

const Dashboard = () => {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)  // ✅ loading state
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    chat.initlizeSocket()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = async (event) => {
    event.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) return

    setIsLoading(true)  // ✅ start loading
    setChatInput('')

    try {
      await chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    } finally {
      setIsLoading(false)  // ✅ stop loading
    }
  }

  const openChat = (chatId) => {
    if (!chatId) return;
    chat.handleOpenChat(chatId, chats)
    setSidebarOpen(false)
  }

  return (
    <main className='min-h-screen w-full bg-[#0a0c14] font-[Geist,sans-serif]'>
      <section className='flex h-screen w-full relative overflow-hidden'>

        {sidebarOpen && (
          <div
            className='fixed inset-0 bg-black/55 z-10 md:hidden'
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            fixed md:relative top-0 left-0 h-full z-20
            w-60 shrink-0 flex flex-col
            bg-[#0d1018] border-r border-white/[0.06]
            p-4 gap-1.5
            transition-transform duration-250 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
          `}
        >
          <h1 className='text-[17px] font-semibold text-white tracking-tight px-2 pb-3.5 mb-1 border-b border-white/[0.06]'>
            Per<span className='text-[#5b7cf5]'>plex</span>
          </h1>
          <div className='flex flex-col gap-1.5 overflow-y-auto'>
            {Object.values(chats).map((c, index) => (
              <button
                onClick={() => openChat(c.id)}
                key={index}
                type='button'
                className={`w-full cursor-pointer rounded-xl px-3 py-2 text-left text-[12.5px] font-normal transition-all duration-150 truncate
                  ${currentChatId === c.id
                    ? 'bg-[#5b7cf5]/10 border border-[#5b7cf5]/25 text-[#8aa3f7]'
                    : 'bg-transparent border border-white/[0.07] text-white/55 hover:bg-white/[0.05] hover:border-white/[0.14] hover:text-white/90'
                  }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </aside>

        <section className='flex flex-1 flex-col min-w-0 h-full'>

          <div className='flex items-center gap-2.5 px-4 py-3.5 border-b border-white/[0.06]'>
            <button
              onClick={() => setSidebarOpen(true)}
              className='md:hidden flex items-center justify-center border border-white/[0.1] rounded-lg p-1.5 text-white/60 hover:text-white transition-colors'
            >
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path d='M2 4h12M2 8h12M2 12h12' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'/>
              </svg>
            </button>
            <div className='w-2 h-2 rounded-full bg-[#5b7cf5] hidden md:block' />
            <span className='text-[13px] font-medium text-white/75 truncate flex-1'>
              {currentChatId ? chats[currentChatId]?.title || 'Chat' : 'Select a chat'}
            </span>
          </div>

          <div className='flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5 pb-24'>
            {currentChatId && chats[currentChatId]?.messages?.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] md:max-w-[78%] w-fit text-[13px] md:text-sm leading-relaxed px-3.5 py-2.5
                  ${message.role === 'user'
                    ? 'ml-auto rounded-2xl rounded-br-[4px] bg-[#5b7cf5]/[0.17] border border-[#5b7cf5]/[0.22] text-white/90'
                    : 'mr-auto rounded-2xl rounded-bl-[4px] bg-white/[0.04] border border-white/[0.07] text-white/75'
                  }`}
              >
                {message.role === 'user' ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                      ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                      ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                      code: ({ children }) => <code className='rounded-md bg-white/[0.1] px-1.5 py-0.5 text-[12px] font-mono'>{children}</code>,
                      pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-black/40 p-3 text-[12px]'>{children}</pre>
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}

            {/* ✅ Typing indicator - sirf tab dikhega jab loading ho */}
            {isLoading && <TypingIndicator />}
          </div>

          <footer className='absolute bottom-0 left-0 right-0 px-3 py-3 border-t border-white/[0.06] bg-[#0a0c14]'>
            <form onSubmit={handleSubmitMessage} className='flex items-center gap-2'>
              <input
                type='text'
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder='Type your message...'
                disabled={isLoading}  // ✅ loading pe input disable
                className='flex-1 min-w-0 rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-white/20 focus:bg-white/[0.07] disabled:opacity-50 disabled:cursor-not-allowed'
              />
              <button
                type='submit'
                disabled={!chatInput.trim() || isLoading}  // ✅ loading pe button disable
                className='rounded-xl bg-[#5b7cf5] px-4 md:px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4a6be0] disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap'
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  )
}

export default Dashboard