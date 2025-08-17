import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Get your API key from environment
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// ✅ Correct model path and format
const model = genAI.getGenerativeModel({
  model: "models/gemini-pro", // DON'T remove 'models/'
});

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }]
        }
      ]
    });

    return result.response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    return "Sorry, I’m having trouble responding right now.";
  }
};
