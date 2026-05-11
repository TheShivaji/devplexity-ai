import { tavily } from "@tavily/core";

export const searchWeb = async (input) => {
    try {
        const query = typeof input === "string" ? input : input.query;
        if (!query) {
            throw new Error("Query is missing");
        }
        const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
        const response = await tvly.search(query , {
            maxResults : 5,
        });
        
        return JSON.stringify(response.results);
    } catch (error) {
        console.error("Tavily Search Error:", error);
        return "Failed to search the web. Tell the user you couldn't access the internet.";
    }
}















































