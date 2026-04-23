import { runGemini } from "./gemini";
import { runGroq } from "./groq";

export async function runAI(prompt: string): Promise<string> {
  try {
    return await runGemini(prompt);
  } catch (err) {
    console.log("⚠️ Gemini failed → switching to Groq");
    console.log(err)
    return await runGroq(prompt);
  }
}