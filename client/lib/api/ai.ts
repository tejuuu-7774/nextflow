export async function runAIRequest(prompt: string): Promise<string> {
  const res = await fetch("http://localhost:3001/api/ai/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error || "AI request failed");
  }

  const data = await res.json();
  return data.output;
}
