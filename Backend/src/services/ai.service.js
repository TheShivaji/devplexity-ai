import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";
import { searchWeb } from "./internet.service.js";

const chatModel = new ChatGroq({
    model: 'openai/gpt-oss-120b',
    apiKey: process.env.GROQ_API_KEY,
});
const titleModel = new ChatGroq({
    model: 'openai/gpt-oss-20b',
    apiKey: process.env.GROQ_API_KEY,
});

const formatChatMessages = (messages, systemPrompt) => [
    new SystemMessage(systemPrompt),
    ...messages.flatMap((msg) => {
        if (msg.role === "user") return [new HumanMessage(msg.content)];
        if (msg.role === "ai") return [new AIMessage(msg.content)];
        return [];
    }),
];

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

    if (searchEnable) {
        const lastUserMessage = [...messages].reverse().find((msg) => msg.role === "user");
        const query = lastUserMessage?.content?.trim();
        if (!query) {
            throw new Error("No user message found for web search");
        }

        const searchResults = await searchWeb({ query });
        const searchSystemPrompt = `${SystemPrompt}
Use the web search results below to answer. Cite facts from the results when possible. If results are empty or unhelpful, say you could not find reliable information.

Web search results:
${searchResults}`;

        const response = await chatModel.invoke(
            formatChatMessages(messages, searchSystemPrompt)
        );
        return response.text;
    }

    const response = await chatModel.invoke(formatChatMessages(messages, SystemPrompt));
    return response.text;
}

export const getTittle = async (message) => {
    try {
        const title = await titleModel.invoke([
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
