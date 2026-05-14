import express from "express";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);

export default app;