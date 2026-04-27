const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";

type GroqResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

export async function runGroq(
  prompt: string,
  model?: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY");
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model?.trim() || DEFAULT_GROQ_MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = (await res.json().catch(() => null)) as GroqResponse | null;

  if (!res.ok) {
    throw new Error(data?.error?.message || `Groq failed with ${res.status}`);
  }

  return data?.choices?.[0]?.message?.content || "[Empty Groq response]";
}
