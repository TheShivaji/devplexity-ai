import { getTittle, getAIMessage } from "../services/ai.service.js";
import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        let { message, chat: chatId } = req.body;
        const userId = req.user.id || req.body.userId;

        let chat;
        let title;

        // Create chat if it doesn't exist
        if (!chatId) {
            title = await getTittle(message);
            chat = await chatModel.create({
                user: userId,
                title: title
            });
            // Important: assign the newly created chat ID to chatId
            // so subsequent code knows which chat to attach messages to
            chatId = chat._id;
        }

        const userMessage = await messageModel.create({
            chat: chatId,
            content: message,
            role: 'user'
        });

        const messages = await messageModel.find({ chat: chatId });

        const aiResponse = await getAIMessage(messages);

        const aiMessage = await messageModel.create({
            chat: chatId,
            content: aiResponse,
            role: 'ai'
        });

        return res.status(200).json({
            success: true,
            title,
            chat,
            aiMessage
        });

    } catch (error) {
        console.log("Error in sendMessage:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}