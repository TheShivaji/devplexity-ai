<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=200&section=header&text=devplexity-ai&fontSize=64&fontAlign=50&animation=fadeIn&fontAlignY=38&desc=AI%20Chat%20%2B%20Web%20Search%20%2B%20Study%20Mode%20%7C%20MERN%20%2B%20LangChain%20Agent&descAlign=50&descAlignY=60&fontColor=ffffff&descColor=a78bfa" />

</div>

<div align="center">

![Status](https://img.shields.io/badge/Status-In%20Progress-a78bfa?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20LangChain-7c3aed?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Mixtral%208x22B%20%2B%20Mistral-0077B5?style=for-the-badge)
![Search](https://img.shields.io/badge/Search-Tavily%20API-22c55e?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge)

</div>

---

## 🔍 What is devplexity-ai?

**devplexity-ai** is a Perplexity-inspired full-stack AI chat app with real web search and a built-in **Study Mode** — a feature Perplexity itself doesn't have.

The AI backend runs a **LangChain Agent** powered by **Mixtral 8x22B**. When web search is enabled, the agent automatically calls the **Tavily search tool** and answers based on live results. **Mistral Medium** handles smart chat title generation.

**Study Mode** lets you search any topic and get AI-generated **flashcards** (tap to flip) and an **interactive quiz** with scoring — all from a single search.

---

## ✨ Features

### ✅ Done
- 🤖 **LangChain Agent** — Mixtral 8x22B with Tavily tool calling
- 🌐 **Web Search Toggle** — Turn Tavily search ON/OFF per message
- 📚 **Study Mode** — Enter any topic → get 5 flashcards + 5-question quiz
- 🃏 **Flip Flashcards** — Tap any card to reveal answer
- 🧪 **Interactive Quiz** — Options highlight green/red, score shown at end
- ✍️ **Smart Chat Titles** — Mistral Medium auto-generates titles
- 💬 **Persistent Chat History** — All chats + messages saved in MongoDB
- 📋 **Chat Sidebar** — Lists all chats, lazy loads messages on click
- 🔀 **New Chat** — One click to start a fresh conversation
- 🗑️ **Delete Chat** — Hover to delete from sidebar
- ⌨️ **Typing Indicator** — Bouncing dots while AI is thinking
- 📝 **Markdown Rendering** — react-markdown + remark-gfm
- 🔐 **Full Auth System** — Signup, Login, OTP email verification, JWT + HTTP-only cookies
- 🛡️ **Protected Routes** — Guards on both frontend and backend
- 📦 **Redux Toolkit** — Global chat state management
- 🔌 **Socket.io** — Initialized and connected on dashboard load
- ✅ **Zod Validation** — Input validation on backend

### 🔜 Coming Soon
- ⚡ **Streaming Responses** — Token-by-token via Socket.io
- 🐳 **Docker** — Containerized setup
- 🚀 **Deployment**

---

## 🖼️ Demo

> 🚧 Screenshots / video coming soon — project is in active development.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router v7, Redux Toolkit, Tailwind CSS v4, Vite |
| **Backend** | Node.js, Express 5, Socket.io |
| **Database** | MongoDB + Mongoose |
| **AI Agent** | Mixtral 8x22B via LangChain Agent + Tool Calling |
| **Title Gen** | Mistral Medium (via LangChain) |
| **Web Search** | Tavily API (top 5 results) |
| **Markdown** | react-markdown + remark-gfm |
| **Auth** | JWT, bcrypt, HTTP-only Cookies, OTP via Nodemailer + Mailtrap |
| **Validation** | Zod, express-validator |

---

## 📁 Project Structure

```
devplexity-ai/
├── Backend/
│   ├── server.js                          # Entry — HTTP + Socket.io
│   ├── utils/
│   │   └── generateJwtToken.js
│   └── src/
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   ├── auth.controller.js         # Signup, Login, OTP verify, getMe
│       │   └── chat.controller.js         # sendMessage, getChats, getMessages, deleteChat
│       ├── mailtrap/                      # Email templates + config
│       ├── middleware/
│       │   └── auth.middlewares.js        # JWT protectRoute
│       ├── model/
│       │   ├── user.model.js
│       │   ├── chat.model.js
│       │   └── message.model.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   └── chat.routes.js
│       ├── services/
│       │   ├── ai.service.js              # LangChain Agent (Mixtral 8x22B) + Mistral title gen
│       │   └── internet.service.js        # Tavily web search tool
│       └── socket/
│           └── server.socket.js
│
└── Frontend/
    └── src/
        ├── app/
        │   ├── App.jsx
        │   ├── app.routes.jsx
        │   └── app.store.js
        └── feature/
            ├── auth/                      # Login, Signup, guards, useAuth
            └── chat/
                ├── Pages/
                │   └── Dashboard.jsx      # Main UI — chat + study mode
                ├── Services/
                │   ├── chat.api.js
                │   └── chat.socket.js
                ├── components/
                │   ├── Sidebar.jsx        # Chat list, new chat, delete, logout
                │   ├── Topbar.jsx
                │   ├── ModeTabs.jsx       # Chat / Study Mode tabs
                │   └── ChatWindow.jsx     # Messages, input, web search toggle
                ├── hook/
                │   └── useChat.js
                └── chat.slice.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- API keys: Mistral, Tavily, Mailtrap

### Installation

```bash
git clone https://github.com/TheShivaji/devplexity-ai.git
cd devplexity-ai

cd Backend && npm install
cd ../Frontend && npm install
```

### Environment Setup

Create `.env` inside `/Backend`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string

MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_api_key

JWT_SECRET=your_jwt_secret

MAILTRAP_TOKEN=your_mailtrap_token
MAILTRAP_ENDPOINT=your_mailtrap_endpoint
```

### Run

```bash
# Backend
cd Backend && npm run dev

# Frontend
cd Frontend && npm run dev
```

Frontend → `http://localhost:5173`  
Backend → `http://localhost:3000`

---

## 🧠 How the AI Agent Works

```
User sends a message
        ↓
Backend fetches full chat history from MongoDB
        ↓
LangChain Agent (Mixtral 8x22B) receives history
        ↓
searchEnable = true?          searchEnable = false?
        ↓                              ↓
Agent calls Tavily tool        Direct model response
(top 5 web results)
        ↓
Final response generated + saved to MongoDB
        ↓
If new chat → Mistral generates title
        ↓
Response → Redux → UI re-renders
```

## 📚 How Study Mode Works

```
User enters topic → Generate click
        ↓
studyMode = true → SystemPrompt forces JSON output
        ↓
Mixtral returns:
{
  topic, 
  flashcards: [{ question, answer } x5],
  quiz: [{ question, options[4], correct } x5]
}
        ↓
Frontend parses JSON → renders flashcards + quiz
        ↓
Tap card → flip    |    Click option → green/red
All answered → Score shown
```

---

## 📌 Roadmap

- [x] Auth — signup, login, OTP email verification
- [x] JWT + HTTP-only cookie sessions
- [x] LangChain Agent with Mixtral 8x22B
- [x] Tavily web search toggle (ON/OFF per message)
- [x] Mistral Medium chat title generation
- [x] Persistent chat + message history in MongoDB
- [x] Full Chat API — send, list, getMessages, deleteChat
- [x] Redux Toolkit — full chat state management
- [x] Component refactor — Sidebar, Topbar, ModeTabs, ChatWindow
- [x] New Chat button — clears currentChatId
- [x] Study Mode — flashcard generation + flip interaction
- [x] Study Mode — MCQ quiz with correct/wrong highlighting + score
- [x] Markdown rendering — react-markdown + remark-gfm
- [x] Socket.io initialized on dashboard load
- [x] Zod validation on backend
- [ ] Streaming responses via Socket.io
- [ ] Docker setup
- [ ] Deploy to production

---

## 🎯 Interview Questions

Studying this codebase for interviews? Check out [`INTERVIEW_QUESTIONS.md`](./INTERVIEW_QUESTIONS.md) — 10 senior-level questions based on the actual architecture of this project covering:

- REST vs WebSockets trade-offs
- Scaling Socket.io with Redis
- AI hallucination handling with StructuredOutputParser
- LangChain Agent ReAct logic
- Node.js event loop + async I/O
- MongoDB schema design decisions
- JWT revocation strategies
- OTP security best practices
- Redux vs local state decisions
- React memory leaks + useEffect cleanup

---

## 🤝 Contributing

PRs and feedback welcome — building this fully in public.

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'Add some feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Built By

**Shivaji Jagdale (TheShivaji)**  
Full Stack + AI Developer — Building in Public

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/prathamesh-jagdale-48817330b)
[![GitHub](https://img.shields.io/badge/GitHub-171515?style=flat-square&logo=github&logoColor=white)](https://github.com/TheShivaji)

---

<div align="center">
  <sub>⭐ Star this repo if you find it useful — keeps the motivation alive.</sub>
</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=120&section=footer" />