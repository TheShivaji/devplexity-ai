import { initlizeSocket } from "../Services/chat.socket.js";

import { useDispatch } from "react-redux";
import { getChatsAPI, getMessagesAPI, sendMessageAPI, deleteChatAPI } from "../Services/chat.api.js";
import { setChats, setCurrentChatId, addMessage, deleteChat, createNewChat, setLoading, setError } from "../chat.slice.js";

export const useChat = () => {
    const dispatch = useDispatch();


    const handleSendMessage = async ({ message, chatId }) => {
        try {
            const response = await sendMessageAPI(message, chatId);
            const { chatId: newChatId, aiMessage } = response
            const finalChatId = chatId || newChatId
            if (!chatId) {
                dispatch(createNewChat(
                    {
                        chatId: newChatId,
                        title: response.title
                    }
                ))
            }
            dispatch(setCurrentChatId(finalChatId))
            dispatch(addMessage({
                chatId: finalChatId,
                content: message,
                role: "user"
            }))
            dispatch(addMessage({
                chatId: finalChatId,
                content: aiMessage.content,
                role: aiMessage.role
            }))

        } catch (error) {
            console.log("Error in handleSendMessage", error.message)
        }
    }

    const handleGetChats = async () => {
        dispatch(setLoading(true))
        const data = await getChatsAPI()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[chat.id || chat._id] = {
                id: chat.id || chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }
    const handleOpenChat = async (chatId, chats) => {
        try {
            dispatch(setLoading(true))
            if (chats[chatId]?.messages?.length > 0) {
                dispatch(setCurrentChatId(chatId))
                return
            }
            dispatch(setLoading(true))
            const data = await getMessagesAPI(chatId)
            const { messages } = data
            const formatedMessages = messages.map((message) => ({
                id: message.id,
                content: message.content,
                role: message.role,
            }))
            console.log("formatedMessages:", formatedMessages)
            formatedMessages.forEach((msg) => {
                dispatch(addMessage({
                    chatId,
                    content: msg.content,
                    role: msg.role
                }));
            });
            dispatch(setCurrentChatId(chatId))
            dispatch(setLoading(false))
        } catch (error) {
            console.log("Error in handleOpenChat", error.message)
            dispatch(setLoading(false))
        }
    }

    const handleDeleteChat = async (chatId) => {
        try {
            dispatch(setLoading(true));
            await deleteChatAPI(chatId);
            dispatch(deleteChat(chatId));
            dispatch(setLoading(false));
        } catch (error) {
            console.log("Error in handleDeleteChat", error.message);
            dispatch(setLoading(false));
        }
    }

    return {
        handleSendMessage,
        initlizeSocket,
        handleGetChats,
        handleOpenChat,
        handleDeleteChat,
    }
}

