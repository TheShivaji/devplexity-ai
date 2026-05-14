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
          <div className='flex-1 flex flex-col items-center justify-center gap-3 text-white/30'>
            <span className='text-4xl'>📚</span>
            <p className='text-[14px] tracking-tight'>Study Mode — coming soon</p>
          </div>
        )}

      </section>
    </main>
  )
}

export default Dashboard