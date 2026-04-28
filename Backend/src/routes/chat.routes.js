import express from "express";
import { sendMessage } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middlewares.js";


const chatRouter = express.Router();

chatRouter.post("/send", protectRoute, sendMessage);

export default chatRouter;



