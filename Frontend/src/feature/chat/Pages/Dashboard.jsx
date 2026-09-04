import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../hook/useChat.js'
import { logout } from '../../auth/services/auth.api.js'
import { setUser } from '../../auth/auth.slice.js'

import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import ChatWindow from '../components/ChatWindow.jsx'

const Dashboard = () => {
  const chat = useChat()

  const [chatInput, setChatInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchEnable, setSearchEnable] = useState(false)
  const [studyEnable, setStudyEnable] = useState(false)

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
      await chat.handleSendMessage({ 
        message: trimmedMessage, 
        chatId: currentChatId, 
        searchEnable,
        studyMode: studyEnable
      })
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
    <main className="h-screen bg-[#050507] text-white overflow-hidden flex font-sans">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        chats={chats}
        currentChatId={currentChatId}
        openChat={openChat}
        handleDeleteChat={chat.handleDeleteChat}
        handleLogout={handleLogout}
      />

      {/* Main panel */}
      <section className="flex flex-1 flex-col min-w-0 h-full">
        <Topbar
          setSidebarOpen={setSidebarOpen}
          currentChatId={currentChatId}
          chats={chats}
        />
        {/* Content Area */}
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
          studyEnable={studyEnable}
          setStudyEnable={setStudyEnable}
        />
      </section>
    </main>
  )
}

export default Dashboard