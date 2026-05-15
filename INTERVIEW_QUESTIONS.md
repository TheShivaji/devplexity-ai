# Full-Stack AI Chat Application - Interview Questions

Based on a thorough scan of your codebase (Devplexity AI), here are several rigorous, interview-level questions broken down by domain. These questions simulate a real-world technical interview where an engineering manager or senior developer reviews your code and asks you to justify your architectural decisions.

## 1. System Architecture & Real-Time Communication
**Q1: REST vs. WebSockets**
You have implemented standard REST API routes for authentication and initial data fetching (e.g., fetching old chats), but you rely on `Socket.IO` for real-time messaging. 
* *Question:* What are the trade-offs of mixing REST and WebSockets? Why not handle everything, including fetching initial chat history, exclusively over the WebSocket connection?

**Q2: Scaling Socket.IO**
Currently, your app runs on a single Node.js instance.
* *Question:* If your application goes viral and hits 100,000 concurrent users, a single Node.js process will crash. How would you scale your Socket.IO implementation across multiple servers? What specific technologies (like Redis adapters) would you need to implement to ensure messages are broadcasted correctly?

## 2. Artificial Intelligence & LangChain
**Q3: Handling AI Hallucinations in Study Mode**
In `Dashboard.jsx`, your Study Mode relies on parsing JSON out of a raw string returned by the model:
`const cleaned = raw.replace(/```json|```/g, '').trim(); const parsed = JSON.parse(cleaned);`
* *Question:* AI models are non-deterministic and sometimes fail to follow formatting rules perfectly. If the model returns malformed JSON, your app throws an error and the user sees "Something went wrong." How could you use LangChain's `StructuredOutputParser` or `Zod` schemas to guarantee the model's output format and automatically retry if it fails?

**Q4: Agent Tool Selection**
In `ai.service.js`, you define a `searchWebTool` using Tavily. 
* *Question:* How does the LangChain Agent under the hood actually "know" when to search the web versus answering from its own internal knowledge? Explain how ReAct (Reasoning and Acting) logic or function calling works in this context.

## 3. Backend & Database (Node.js / Express / MongoDB)
**Q5: Event Loop and Blocking Operations**
In your controllers, you wait for AI inferences which can take several seconds (e.g., `await agent.invoke(...)`). 
* *Question:* Node.js is single-threaded. Does waiting for a 10-second AI response block other users from logging in or fetching their chats at the exact same time? Explain how Node.js handles asynchronous network I/O operations.

**Q6: MongoDB Schema Design**
Your application has a `chatModel` and a `messageModel`.
* *Question:* Why did you choose to normalize this data (keeping messages in a separate collection and referencing the `chatId`) instead of embedding the messages as an array directly inside the `chatModel` document? What are the read/write performance implications of your choice as a chat grows to 10,000 messages?

## 4. Security & Authentication
**Q7: JWT vs. Session Management**
You are generating a JWT and storing it in an HTTP-only cookie (`generateJwtToken.js`), which is great for security.
* *Question:* What happens if a malicious actor steals a user's device and you need to revoke their access immediately? Since JWTs are stateless and valid until they expire, how would you implement a token revocation or "force logout from all devices" feature?

**Q8: OTP Security**
In `auth.controller.js`, you hash user passwords using `bcryptjs`, but you store the `verificationToken` (OTP) in plain text in the database.
* *Question:* If an attacker gains read access to your database, they can see the plain text OTPs and verify unverified accounts. Why is it a best practice to also hash OTPs, and how would you implement this?

## 5. Frontend & React Reactivity
**Q9: Global vs. Local State Management**
In `Dashboard.jsx`, you use Redux to store `chats` and `currentChatId`, but you use local `useState` for things like `chatInput`, `sidebarOpen`, and `studyData`.
* *Question:* What was your thought process for deciding what goes into Redux versus what stays in local state? At what point would you move `studyData` into the Redux store?

**Q10: React Lifecycle & Memory Leaks**
You initialize your socket connection inside a `useEffect` with an empty dependency array `[]`.
* *Question:* When a user navigates away from the Dashboard or logs out, what happens to that socket connection? Have you implemented a cleanup function in your `useEffect` (`return () => socket.disconnect()`)? If not, what kind of memory leaks or duplicate message bugs could occur?

---
*Tip: Try answering these questions out loud or writing down your responses. These are exactly the types of questions a Senior Engineer will ask during a system design or code review interview!*