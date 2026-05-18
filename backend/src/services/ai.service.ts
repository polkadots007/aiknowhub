import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

const apiKey  = process.env.GEMINI_API_KEY;

if(!apiKey){
    throw new Error("Invalid GEMINI_API_KEY")
}

// 1. Initialize the SDK with your API Key
const geminiAI = new GoogleGenAI({});

export const getAIResponse = async (prompt: string) => {
  // 2. Select the model (Flash is recommended for free tier speed)

  try {
    // 3. Generate content
     const result = await geminiAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });
    const text = await result.text;
    
    return text;
  } catch (error) {
    if(error instanceof Error)
        console.error("Error connecting to Gemini:", error.message);
  }
}
