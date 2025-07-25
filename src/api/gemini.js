import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Đặt API Key vào biến môi trường VITE_GEMINI_API_KEY

const genAI = new GoogleGenerativeAI(API_KEY);
console.log("Gemini API KEY:", API_KEY);
export async function getGeminiReply(message) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I couldn't get a response from Gemini.";
  }
}
