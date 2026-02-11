
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from 'dotenv';
config({ path: '.env.local' });

async function testImagen() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        console.log("Testing Imagen 3 access...");
        // Attempt to get the model. Note: For image generation via API key, 
        // the endpoint might be different or require specific model naming via the newer SDK methods if available.
        // As of latest SDK, image generation might be via a specific method or model.
        // Let's try the standard generateContent with text prompt on the image model.
        const model = genAI.getGenerativeModel({ model: "imagen-3.0-generate-001" });

        const result = await model.generateContent("A cute banana wearing sunglasses");
        console.log("Success:", result);
    } catch (error) {
        console.error("Error testing Imagen 3:", error.message);
    }
}

testImagen();
