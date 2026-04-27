import { Router } from "express";
import { LLMProvider, runAI } from "../lib/integrations/ai";

const router = Router();

router.post("/run", async (req, res) => {
  const body = req.body as {
    prompt?: unknown;
    provider?: unknown;
    model?: unknown;
  };
  const { prompt, provider, model } = body;

  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const selectedProvider: LLMProvider =
    provider === "groq" || provider === "gemini" ? provider : "gemini";
  const selectedModel = typeof model === "string" ? model : undefined;

  try {
    const output = await runAI(prompt, selectedProvider, selectedModel);
    return res.json({ output });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "AI request failed";

    return res.status(500).json({ error: message });
  }
});

export default router;
