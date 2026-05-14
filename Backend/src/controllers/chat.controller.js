import { getTittle, getAIMessage } from "../services/ai.service.js";
import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        let { message, chat: chatId, searchEnable = false } = req.body;
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

        const aiResponse = await getAIMessage(messages, searchEnable);

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

export const getChats = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;
        const chats = await chatModel.find({ user: userId }).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            chats
        });
    } catch (error) {
        console.log("Error in getChats:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    ;
    try {
        const { chatId } = req.params;
        console.log("chatId:", chatId)
        const userId = req.user.id || req.user._id;
        const chat = await chatModel.findOne({
            _id: chatId,
            user: userId
        });
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found or unauthorized" });
        }
        const messages = await messageModel.find({ chat: chatId });
        return res.status(200).json({
            success: true,
            messages
        });
    } catch (error) {
        console.log("Error in getMessages:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user.id || req.user._id;
        const chat = await chatModel.findByIdAndDelete({
            _id: chatId,
            user: userId
        })
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found or unauthorized" });
        }
        await messageModel.deleteMany({ chat: chatId });

        return res.status(200).json({
            success: true,
            message: "Chat deleted successfully"
        });
    } catch (error) {
        console.log("Error in deleteChat:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}