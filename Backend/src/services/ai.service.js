import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from "langchain";
import { searchWeb } from "./internet.service.js";
import * as z from "zod";


const geminiModel = new ChatMistralAI({
    model: "open-mixtral-8x22b",
    apiKey: process.env.MISTRAL_API_KEY
});
const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

const searchWebTool = tool(searchWeb, {
    name: "searchWeb",
    description: "search the web for information",
    schema: z.object({
        query: z.string().describe("the query to search the web for")
    })
})

const agent = createAgent({
    model: geminiModel,
    tools: [searchWebTool],

});

export async function getAIMessage(messages) {
    console.log(messages)

    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
                If real-time information is unavailable, clearly say that exact data may not be available.
                Do not hallucinate future facts.
            `),
            ...(messages.map(msg => {
                if (msg.role == "user") {
                    return new HumanMessage(msg.content)
                } else if (msg.role == "ai") {
                    return new AIMessage(msg.content)
                }
            }))]
    });

    return response.messages[response.messages.length - 1].text;
}

export const getTittle = async (message) => {
    try {
        const title = await mistralModel.invoke([
            new SystemMessage("You are a deterministic chat title generator, Generate ONLY one short title max 5 words, Use simple English, Do not use creative variations,Base title only on the main topic of the conversation."),
            new HumanMessage(`
                generate title for this chat conversation based on first user message only 
                ${message}
            `)
        ])
        return title.text;
    } catch (error) {
        console.log("error in getting title : ", error.message);
    }
}
export const getChat = async (req, res) => {
    try {
        const user = req.user.id;

        const chat = await chatModel.findOne({ user: user });

        if (!chat) {
            return res.status(200).json({
                success: false,
                message: "chat not found"
            })
        }

        const messages = await messageModel.find({ chat: chat._id });

        return res.status(200).json({
            success: true,
            message: "chat found",
            chat,
            messages
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error"
        });
        console.log("error in getting chat : ", error.message);
    }
}

export const getMessage = async (req, res) => {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({
        id: chatId,
        user: req.user._id
    })
    if (!chat) {
        return res.status(404).json({
            message: "chat not founded"
        })
    }

    const message = await messageModel.findOne({
        chat: chatId
    })

    res.status(200).json({
        message: "message retrive successfully"
    })
}

export const getDelete = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await chatModel.findOneAndDelete({
            _id: chatId,
            user: req.user.id || req.user._id
        });

        if (!chat) {
            return res.status(404).json({
                message: "chat not found"
            });
        }

        await messageModel.deleteMany({
            chat: chatId
        });

        res.status(200).json({
            success: true,
            message: "chat deleted successfully"
        });
    } catch (error) {
        console.log("error in deleting chat : ", error.message);
        return res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
}
