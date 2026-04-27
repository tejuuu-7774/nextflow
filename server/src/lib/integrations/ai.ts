import { runGemini } from "../ai/gemini";
import { runGroq } from "../ai/groq";

export type LLMProvider = "gemini" | "groq";

const DEFAULT_PROVIDER: LLMProvider = "gemini";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";

function normalizeProvider(provider?: string): LLMProvider {
  return provider === "groq" || provider === "gemini"
    ? provider
    : DEFAULT_PROVIDER;
}

function defaultModelForProvider(provider: LLMProvider): string {
  return provider === "groq" ? DEFAULT_GROQ_MODEL : DEFAULT_GEMINI_MODEL;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isQuotaError(error: unknown): boolean {
  const message = errorMessage(error).toLowerCase();

  return (
    message.includes("quota") ||
    message.includes("rate limit") ||
    message.includes("resource_exhausted") ||
    message.includes("429")
  );
}

export async function runAI(
  prompt: string,
  provider?: LLMProvider,
  model?: string
): Promise<string> {
  const selectedProvider = normalizeProvider(provider);
  const selectedModel = model?.trim() || defaultModelForProvider(selectedProvider);

  if (!prompt.trim()) {
    return "";
  }

  if (selectedProvider === "groq") {
    return runGroq(prompt, selectedModel).catch((error: unknown) => {
      console.error("Groq failed:", errorMessage(error));
      return "AI request failed";
    });
  }

  try {
    return await runGemini(prompt, selectedModel);
  } catch (error) {
    const fallbackReason = isQuotaError(error) ? "quota error" : "Gemini failure";
    console.error(`${fallbackReason}; falling back to Groq:`, errorMessage(error));

    return runGroq(prompt, DEFAULT_GROQ_MODEL).catch((fallbackError: unknown) => {
      console.error("Groq fallback failed:", errorMessage(fallbackError));
      return "AI request failed";
    });
  }
}
