const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function saveWorkflow(data: {
  name: string;
  nodes: unknown[];
  edges: unknown[];
}) {
  const res = await fetch(`${BASE_URL}/api/workflows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to save workflow");
  }

  return res.json();
}

export async function getWorkflows() {
  const res = await fetch(`${BASE_URL}/api/workflows`);

  if (!res.ok) throw new Error("Failed to fetch workflows");

  return res.json();
}

export async function deleteWorkflow(id: string) {
  const res = await fetch(`${BASE_URL}/api/workflows/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("DELETE ERROR:", data);
    throw new Error(data?.error || "Failed to delete workflow");
  }

  return data;
}