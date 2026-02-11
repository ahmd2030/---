
import { config } from 'dotenv';
config({ path: '.env.local' });

async function checkKey() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("No API Key found in .env.local");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        console.log("Fetching available models from API...");
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", data.error);
        } else if (data.models) {
            console.log("✅ API Key works! Available Models:");
            data.models.forEach(m => {
                // Log interesting models (Gemini or Imagen)
                if (m.name.includes('gemini') || m.name.includes('imagen')) {
                    console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`);
                }
            });
        } else {
            console.log("Unexpected response:", data);
        }
    } catch (error) {
        console.error("Network Error:", error.message);
    }
}

checkKey();
