
import { analyzeImage } from "@/lib/ai-service";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        // Remove data:image/xxx;base64, prefix if present
        const base64Data = image.split(",")[1] || image;

        const analysis = await analyzeImage(base64Data);

        return NextResponse.json({ success: true, data: analysis });
    } catch (error) {
        console.error("Analysis API Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
