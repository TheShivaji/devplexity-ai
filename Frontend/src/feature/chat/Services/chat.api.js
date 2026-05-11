import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000/api/chat",
    withCredentials: true
});

export const sendMessageAPI = async (message, chatId) => {
    try {
        const response = await api.post("/send", { message, chat: chatId });
        return response.data;
    } catch (error) {
        console.log("Error in sendMessage api", error.message)
        throw error.response?.data?.message || error.message
    }
}   

export const getChatsAPI = async () => {
    try {
        const response = await api.get("/list");
        return response.data;
    } catch (error) {
        console.log("Error in getChats api" , error.message)
        throw error.response?.data?.message || error.message
    }
}       

export const getMessagesAPI = async (chatId) => {
    try {
        const response = await api.get(`/${chatId}/getmessage`);
        return response.data;
    } catch (error) {
        console.log("Error in getMessages api" , error.message)
        throw error.response?.data?.message || error.message
    }
}       

export const deleteChatAPI = async (chatId) => {
    try {
        const response = await api.delete(`/${chatId}/deletechat`);
        return response.data;
    } catch (error) {
        console.log("Error in deleteChat api" , error.message)
        throw error.response?.data?.message || error.message
    }
}       
