export async function runGroq(prompt: string): Promise<string> {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await res.json();

    console.log("GROQ RESPONSE:", data); // DEBUG

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    return (
      data?.choices?.[0]?.message?.content ||
      "[Groq parsing failed]"
    );
  } catch (err) {
    console.error("Groq error:", err);
    return `[Groq fallback] ${prompt}`;
  }
}