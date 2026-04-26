const GEMINI_MODEL = "gemini-2.0-flash";

export async function runGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  for (let attempt = 1; attempt <= 3; attempt++) {
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
        const data = await res.json();

        return (
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "[Empty Gemini response]"
        );
      }

      const errText = await res.text();

      if (attempt === 3) {
        throw new Error(`Gemini failed: ${errText}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 700 * attempt));
    } catch (error) {
      if (attempt === 3) {
        throw error;
      }
    }
  }

  throw new Error("Gemini failed after retries");
}
