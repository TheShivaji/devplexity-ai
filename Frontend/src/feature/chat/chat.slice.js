import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    currentChat: null,
    messages: [],
    status: "idle",
    error: null,
    isLoading: false,
    
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        deleteChat: (state, action) => {
            state.chats = state.chats.filter(chat => chat._id !== action.payload);
        }
    }
})

export const { setChats, setCurrentChat, setMessages, addMessage, deleteChat } = chatSlice.actions;
export default chatSlice.reducer;