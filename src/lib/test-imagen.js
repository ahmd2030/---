
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function testImagen() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // Attempt to access the Imagen model
        // Note: The model name might be 'imagen-3.0-generate-001' or similar depending on rollout
        const model = genAI.getGenerativeModel({ model: "imagen-3.0-generate-001" });

        // Check if the method exists (it might be different for image gen models in the SDK)
        // Actually, the current Node SDK might not transparently support Imagen yet via getGenerativeModel
        // This is a speculative test.
        const result = await model.generateContent("A cute banana wearing sunglasses");
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testImagen();
