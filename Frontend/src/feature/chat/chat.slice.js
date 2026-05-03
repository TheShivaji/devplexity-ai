import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        createNewChat: (state, action) => {
            const {chatId , title} = action.payload
            
            state.chats[chatId] = {
                id: chatId,
                messages: [],
                title,
                lastUpdate: new Date().toISOString()
            };
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        },
        addMessage: (state, action) => {
            const { chatId, content, role } = action.payload;
            if (state.chats[chatId]) {
                state.chats[chatId].messages.push({
                    id: Date.now().toString() + Math.random(),
                    content,
                    role
                });
            }
        },
        deleteChat: (state, action) => {
            delete state.chats[action.payload];
        },
        setLoading : (state, action) => {
            state.isLoading = action.payload;
        },
        setError : (state , action) => {
            state.error = action.payload
        }
    }
})

export const { createNewChat, setChats, setCurrentChatId, addMessage, deleteChat , setLoading , setError } = chatSlice.actions;
export default chatSlice.reducer;