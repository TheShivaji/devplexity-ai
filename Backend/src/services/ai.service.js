import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";


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
        const title = await mistralModel.invoke([
            new SystemMessage("You are a chat title generator. Generate a concise and creative title for the following chat conversation. Reply with only the title text "),
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

        if (!chat){
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

export const getMessage = async (req , res ) => {
    const {chatId } = req.params;

    const chat = await chatModel.findOne({
        id:chatId,
        user:req.user._id
    })
    if(!chat){
        return res.status(404).json({
            message : "chat not founded"
        })
    }

    const message = await messageModel.findOne({
        chat:chatId
    })

    res.status(200).json({
        message : "message retrive successfully"
    })
}

export const getDelete = async (req , res) => {
        try {
            const {chatId} = req.params;
            const chat = await chatModel.findByIdAndDelete({
                chat:chatId,
                user:req.user._id
            })
            await messageModel.deleteMany({
                chat:chatId
            })
            if(!chat){
                return res.status(404).json({
                    message : "chat not founded"
                })
            }

            res.status(200).json({
                success:true,
                message : "message delete successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message : "internal server error"
            })
            console.log("error in getting chat : ", error.message);
        }
}
