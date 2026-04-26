import { runGemini } from "./gemini";
import { runGroq } from "./groq";

export async function runAI(prompt: string): Promise<string> {
  try {
    return await runGemini(prompt);
  } catch {
    return runGroq(prompt);
  }
}
