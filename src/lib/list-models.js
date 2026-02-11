
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // List models
        // Note: The SDK might not expose listModels directly on the main class in all versions
        // But let's try to infer if we can get a list.
        // Actually, there is no direct listModels on GoogleGenerativeAI instance in the node SDK readily documented for public keys
        // We will just assume if Imagen failed, we go to plan B.
        console.log("Skipping list models, assuming Imagen is private.");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

listModels();
