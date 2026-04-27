const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_RETRY_COUNT = 3;
const GEMINI_RETRY_DELAY_MS = 700;

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function buildGeminiUrl(model: string, apiKey: string): string {
  const encodedModel = encodeURIComponent(model);
  const encodedApiKey = encodeURIComponent(apiKey);

  return `https://generativelanguage.googleapis.com/v1beta/models/${encodedModel}:generateContent?key=${encodedApiKey}`;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function runGemini(
  prompt: string,
  model?: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const selectedModel = model?.trim() || DEFAULT_GEMINI_MODEL;
  const url = buildGeminiUrl(selectedModel, apiKey);
  let lastError = "Gemini failed";

  for (let attempt = 1; attempt <= GEMINI_RETRY_COUNT; attempt += 1) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (res.ok) {
        const data = (await res.json()) as GeminiResponse;

        return (
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "[Empty Gemini response]"
        );
      }

      const errText = await res.text();
      lastError = `Gemini failed with ${res.status}: ${errText}`;

      if (attempt === GEMINI_RETRY_COUNT) {
        throw new Error(lastError);
      }

      await wait(GEMINI_RETRY_DELAY_MS * attempt);
    } catch (error) {
      lastError = getErrorMessage(error);

      if (attempt === GEMINI_RETRY_COUNT) {
        throw error;
      }

      await wait(GEMINI_RETRY_DELAY_MS * attempt);
    }
  }

  throw new Error(lastError);
}
