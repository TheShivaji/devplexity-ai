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

export async function getAIMessage(messages, searchEnable = false, studyMode = false) {
    console.log(messages)
    console.log("searchEnable", searchEnable)
    console.log("studyMode", studyMode)

    const SystemPrompt = studyMode
        ? `You are a study material generator.
       When given a topic, respond ONLY in this exact JSON format, nothing else, no markdown, no backticks:
       {"topic":"topic name","flashcards":[{"question":"q1","answer":"a1"},{"question":"q2","answer":"a2"},{"question":"q3","answer":"a3"},{"question":"q4","answer":"a4"},{"question":"q5","answer":"a5"}],"quiz":[{"question":"q1","options":["a","b","c","d"],"correct":0},{"question":"q2","options":["a","b","c","d"],"correct":1},{"question":"q3","options":["a","b","c","d"],"correct":2},{"question":"q4","options":["a","b","c","d"],"correct":0},{"question":"q5","options":["a","b","c","d"],"correct":1}]}
       Generate exactly 5 flashcards and 5 quiz questions. correct is the index (0-3) of the right answer.`
        : `You are a helpful and precise assistant for answering questions.
       If you don't know the answer, say you don't know.
    Do not hallucinate future facts.
  `

    const formattedMessages = [
        new SystemMessage(SystemPrompt),
        ...(messages.map(msg => {
            if (msg.role === "user") return new HumanMessage(msg.content)
            if (msg.role === "ai") return new AIMessage(msg.content)
        }))
    ]

    if (searchEnable) {
        // Agent mode — Tavily web search active
        const response = await agent.invoke({ messages: formattedMessages })
        return response.messages[response.messages.length - 1].text
    } else {
        // Simple mode — direct model, no search
        const response = await geminiModel.invoke(formattedMessages)
        return response.text
    }
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
