import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import * as z from "zod";


const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-flash-latest",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

export const getAIMessage = async(messages) => {

    try {
        const result = await geminiModel.invoke(messages.map((message) => {
            if (message.role === "user") {
                return new HumanMessage(message.content);
            }
            return new AIMessage(message.content);
        }));
        return result.text;
    } catch (error) {
        console.error("Error in Gemini:", error);
    }
}

export const getTittle = async(message) => {
    try {
        const title = mistralModel.invoke([
            new SystemMessage("You are a chat title generator. Generate a concise and creative title for the following chat conversation. Reply with only the title text "),
            new HumanMessage(`
                generate title for this chat conversation based on first user message   only 
                ${message}
            `)
        ])
        return title.text;
    } catch (error) {
        console.log("error in getting title : ", error.message);
    }
}
