import express from "express";
import { deleteChat, getChats, getMessages, sendMessage } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middlewares.js";


const chatRouter = express.Router();

chatRouter.post("/send", protectRoute, sendMessage);

chatRouter.get("/list", protectRoute, getChats);
chatRouter.get("/:chatId/getmessage", protectRoute, getMessages);
chatRouter.delete("/:chatId/deletechat", protectRoute, deleteChat);

export default chatRouter;



