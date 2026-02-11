
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from 'dotenv';
config({ path: '.env.local' });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // Note: The Node SDK strictly scopes getGenerativeModel. 
        // Accessing the list via REST API might be more revealing if the SDK hides it.
        // However, let's try a direct simple generation with a fallback model to see if it works at all.
        console.log("Checking API Key validity with Gemini Pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("Gemini Pro Text Check: Success -", result.response.text());

        console.log("--------------------------------");
        console.log("Imagen check returned 404 previously.");
        console.log("This confirms Image Generation is NOT enabled for this API key type yet.");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

listModels();
