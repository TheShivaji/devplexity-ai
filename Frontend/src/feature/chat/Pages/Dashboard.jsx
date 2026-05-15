import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../hook/useChat.js'
import { logout } from '../../auth/services/auth.api.js'
import { setUser } from '../../auth/auth.slice.js'

import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import ModeTabs from '../components/ModeTabs.jsx'
import ChatWindow from '../components/ChatWindow.jsx'

const Dashboard = () => {
  const chat = useChat()

  const [chatInput, setChatInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchEnable, setSearchEnable] = useState(false)
  const [mode, setMode] = useState('chat')
  const [studyInput, setStudyInput] = useState('')
  const [studyLoading, setStudyLoading] = useState(false)
  const [studyData, setStudyData] = useState(null)
  const [studyError, setStudyError] = useState(false)
  const [flippedCards, setFlippedCards] = useState({})
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      await chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId, searchEnable })
    } finally {
      setIsLoading(false)
    }
  }

  const openChat = (chatId) => {
    if (!chatId) return
    chat.handleOpenChat(chatId, chats)
    setSidebarOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
      dispatch(setUser(null))
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
  const handleStudyGenerate = async () => {
    const trimmed = studyInput.trim()
    if (!trimmed) return
    setStudyLoading(true)
    setStudyData(null)
    setStudyError(false)
    setFlippedCards({})
    setQuizAnswers({})
    setShowResults(false)
    try {
      const response = await chat.handleSendMessage({
        message: trimmed,
        chatId: null,
        searchEnable: true,
        studyMode: true
      })
      const raw = response?.aiMessage?.content || ''
      const cleaned = raw.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(cleaned)
      setStudyData(parsed)
    } catch (err) {
      console.error('Study parse error:', err)
      setStudyError(true)
    } finally {
      setStudyLoading(false)
    }
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

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        chats={chats}
        currentChatId={currentChatId}
        openChat={openChat}
        handleDeleteChat={chat.handleDeleteChat}
        handleLogout={handleLogout}
      />

      {/* ── Main panel ── */}
      <section className='flex flex-1 flex-col min-w-0 h-full'>
        <Topbar
          setSidebarOpen={setSidebarOpen}
          currentChatId={currentChatId}
          chats={chats}
        />
        <ModeTabs
          mode={mode}
          setMode={setMode}
        />

        {/* Content Area */}
        {mode === 'chat' ? (
          <ChatWindow
            currentChatId={currentChatId}
            chats={chats}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
            chatInput={chatInput}
            setChatInput={setChatInput}
            handleSubmitMessage={handleSubmitMessage}
            searchEnable={searchEnable}
            setSearchEnable={setSearchEnable}
          />
        ) : (
          <div className='flex-1 overflow-y-auto px-5 py-6'>
            <div className='max-w-[700px] mx-auto flex flex-col gap-6'>

              {/* Search Input */}
              <div className='flex flex-col gap-2'>
                <h2 className='text-[15px] font-semibold text-white/75 tracking-tight'>📚 Study Mode</h2>
                <p className='text-[12.5px] text-white/30'>Enter any topic — get flashcards & quiz</p>
                <div className='flex items-center gap-2.5 bg-[#191919] border border-white/10 focus-within:border-purple-500/30 rounded-[14px] px-4 py-2.5 transition-colors duration-200'>
                  <input
                    type='text'
                    value={studyInput}
                    onChange={(e) => setStudyInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleStudyGenerate()}
                    placeholder='e.g. Quantum Computing, World War 2...'
                    className='flex-1 bg-transparent outline-none text-[13.5px] text-white/88 placeholder:text-white/25 tracking-tight'
                  />
                  <button
                    type='button'
                    onClick={handleStudyGenerate}
                    disabled={!studyInput.trim() || studyLoading}
                    className='h-8 px-4 rounded-[9px] bg-purple-600 text-white text-[12.5px] font-medium hover:bg-purple-500 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0'
                  >
                    {studyLoading ? (
                      <span className='flex items-center gap-1'>
                        <span className='w-1 h-1 rounded-full bg-white/60 animate-bounce' style={{ animationDelay: '0ms' }} />
                        <span className='w-1 h-1 rounded-full bg-white/60 animate-bounce' style={{ animationDelay: '150ms' }} />
                        <span className='w-1 h-1 rounded-full bg-white/60 animate-bounce' style={{ animationDelay: '300ms' }} />
                      </span>
                    ) : 'Generate'}
                  </button>
                </div>
              </div>

              {/* Error */}
              {studyError && (
                <div className='text-[13px] text-red-400/70 bg-red-500/5 border border-red-500/15 rounded-[10px] px-4 py-3'>
                  Something went wrong. Try again.
                </div>
              )}

              {/* Flashcards */}
              {studyData && (
                <div className='flex flex-col gap-3'>
                  <h3 className='text-[13px] font-semibold text-white/50 uppercase tracking-wider'>
                    Flashcards — {studyData.topic}
                  </h3>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    {studyData.flashcards?.map((card, i) => (
                      <div
                        key={i}
                        onClick={() => setFlippedCards(prev => ({ ...prev, [i]: !prev[i] }))}
                        className='cursor-pointer bg-[#141414] border border-white/[0.08] hover:border-purple-500/25 rounded-[12px] px-4 py-4 min-h-[100px] flex flex-col justify-between transition-all duration-200'
                      >
                        <span className='text-[10.5px] text-white/25 uppercase tracking-wider mb-2'>
                          {flippedCards[i] ? 'Answer' : 'Question'}
                        </span>
                        <p className='text-[13.5px] text-white/80 leading-[1.6]'>
                          {flippedCards[i] ? card.answer : card.question}
                        </p>
                        <span className='text-[11px] text-white/20 mt-2'>
                          {flippedCards[i] ? 'Tap to see question' : 'Tap to flip'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiz */}
              {studyData?.quiz && (
                <div className='flex flex-col gap-4'>
                  <h3 className='text-[13px] font-semibold text-white/50 uppercase tracking-wider'>
                    Quiz
                  </h3>
                  {studyData.quiz.map((q, qi) => (
                    <div key={qi} className='bg-[#141414] border border-white/[0.08] rounded-[12px] px-4 py-4 flex flex-col gap-3'>
                      <p className='text-[13.5px] text-white/80'>{qi + 1}. {q.question}</p>
                      <div className='flex flex-col gap-2'>
                        {q.options.map((opt, oi) => {
                          const selected = quizAnswers[qi] === oi
                          const isCorrect = oi === q.correct
                          const answered = quizAnswers[qi] !== undefined

                          let style = 'border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white/70'
                          if (answered && selected && isCorrect) style = 'border-green-500/40 bg-green-500/10 text-green-400'
                          else if (answered && selected && !isCorrect) style = 'border-red-500/40 bg-red-500/10 text-red-400'
                          else if (answered && isCorrect) style = 'border-green-500/30 bg-green-500/5 text-green-400/70'

                          return (
                            <button
                              key={oi}
                              type='button'
                              disabled={answered}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                              className={`text-left px-3.5 py-2.5 rounded-[8px] border text-[13px] transition-all duration-150 disabled:cursor-default ${style}`}
                            >
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Score */}
                  {Object.keys(quizAnswers).length === studyData.quiz.length && (
                    <div className='bg-purple-500/10 border border-purple-500/20 rounded-[12px] px-4 py-4 text-center'>
                      <p className='text-[14px] font-semibold text-purple-300'>
                        Score: {studyData.quiz.filter((q, i) => quizAnswers[i] === q.correct).length} / {studyData.quiz.length}
                      </p>
                      <p className='text-[12px] text-white/35 mt-1'>
                        {studyData.quiz.filter((q, i) => quizAnswers[i] === q.correct).length === studyData.quiz.length
                          ? '🎉 Perfect score!'
                          : 'Keep practicing!'}
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </section>
    </main>
  )
}

export default Dashboard