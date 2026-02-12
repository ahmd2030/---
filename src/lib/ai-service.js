
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * AI Service Wrapper
 * Handles communication with Google Gemini and Image Generation Models.
 */

export async function refinePromptWithGemini(userPrompts) {
    try {
        // Use gemini-1.5-flash as it is available and fast and capable
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are a professional fashion photographer and stylist AI.
      Create a detailed, high-quality image generation prompt for an AI model (like Imagen or Stable Diffusion).
      
      Details:
      - Subject: ${userPrompts.age} year old model.
      - Background: ${userPrompts.background}.
      - Fashion/Clothing: ${userPrompts.instructions}.
      
      Output ONLY the prompt text, no explanations. 
      Example: "A full body shot of a 25 year old woman wearing a red dress in a modern office..."
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("Gemini Generated Prompt:", text);
        return text.trim();
    } catch (error) {
        console.error("Gemini API Error:", error);
        // Fallback logic
        return `Fashion shot of a ${userPrompts.age} year old model, ${userPrompts.instructions}, in ${userPrompts.background}, 8k resolution, photorealistic`;
    }
}

export async function generateImageNanoBanana(refinedPrompt) {
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = "imagen-3.0-generate-001"; // Trying 3.0 first as it is more standard in docs, fallback to 4.0 if fails?
    // Actually check-key showed: imagen-4.0-generate-001
    const modelName4 = "imagen-4.0-generate-001";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName4}:predict?key=${apiKey}`;

    const payload = {
        instances: [
            {
                prompt: refinedPrompt
            }
        ],
        parameters: {
            sampleCount: 1,
            aspectRatio: "3:4" // Portrait for fashion
        }
    };

    try {
        console.log("Calling Imagen 4.0 via REST API...");
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Imagen API Error ${response.status}: ${errText}`);
        }

        const data = await response.json();

        // Imagen response structure usually:
        // { predictions: [ { bytesBase64Encoded: "..." } ] }
        if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
            // Convert base64 to data URL
            return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
        } else if (data.predictions && data.predictions[0] && data.predictions[0].mimeType && data.predictions[0].bytesBase64Encoded) {
            // Sometimes it includes mimeType
            return `data:${data.predictions[0].mimeType};base64,${data.predictions[0].bytesBase64Encoded}`;
        }

        console.error("Unexpected Imagen Response:", data);
        throw new Error("Invalid response format from Imagen");

    } catch (error) {
        console.error("Image Generation Failed:", error);
        // Fallback to placeholder so app doesn't crash during demo
        return "https://placehold.co/1024x1024/png?text=Imagen+Error+Check+Console";
    }
}

/**
 * Analyzes an image using Gemini 1.5 Flash to extract fashion details.
 * @param {string} imageBase64 - Base64 string of the image.
 * @returns {Promise<Object>} - Extracted tags (color, type, material, style).
 */
export async function analyzeImage(imageBase64) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Analyze this fashion image. Identify the following details:
      1. Garment Type (e.g., Dress, Shirt, Pants)
      2. Color
      3. Material (visual estimation, e.g., Silk, Denim)
      4. Style (e.g., Casual, Evening, Business)
      
      Return ONLY a JSON object with keys: type, color, material, style.
      Do not add markdown formatting.
    `;

        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType: "image/jpeg",
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text().replace(/```json|```/g, "").trim();

        return JSON.parse(text);
    } catch (error) {
        console.error("Smart Vision Error:", error);
        return { type: "", color: "", material: "", style: "" }; // Fallback
    }
}
