export async function runGemini(prompt: string): Promise<string> {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
    process.env.NEXT_PUBLIC_GEMINI_API_KEY;

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
      console.warn(`Gemini attempt ${attempt} failed`, errText);

      await new Promise((r) => setTimeout(r, 700 * attempt));
    } catch (err) {
      console.warn("Gemini network error:", err);
    }
  }

  // DON'T return → THROW
  throw new Error("Gemini failed after retries");
}