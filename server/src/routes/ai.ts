import { Router } from "express";
import { runGemini } from "../lib/ai/gemini";
import { runGroq } from "../lib/ai/groq";
import { runAI } from "../lib/ai/runAI";

const router = Router();

router.post("/run", async (req, res) => {
  const { prompt, provider } = req.body ?? {};

  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const output =
      provider === "gemini"
        ? await runGemini(prompt)
        : provider === "groq"
          ? await runGroq(prompt)
          : await runAI(prompt);

    return res.json({ output });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "AI request failed";

    return res.status(500).json({ error: message });
  }
});

export default router;
