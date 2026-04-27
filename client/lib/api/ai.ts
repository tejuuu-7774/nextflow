import { DEFAULT_LLM_MODEL, DEFAULT_LLM_PROVIDER, LLMProvider } from "@/types/nodeTypes";

type AIResponse = {
  output?: unknown;
  error?: unknown;
};

export async function runAIRequest(
  prompt: string,
  provider: LLMProvider = DEFAULT_LLM_PROVIDER,
  model: string = DEFAULT_LLM_MODEL
): Promise<string> {
  const res = await fetch("http://localhost:3001/api/ai/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, provider, model }),
  });

  const data = (await res.json().catch(() => null)) as AIResponse | null;

  if (!res.ok) {
    throw new Error(
      typeof data?.error === "string" ? data.error : "AI request failed"
    );
  }

  return typeof data?.output === "string" ? data.output : "";
}
