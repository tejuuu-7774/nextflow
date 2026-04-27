export async function saveWorkflow(data: {
  name: string;
  nodes: unknown[];
  edges: unknown[];
}) {
  const res = await fetch("http://localhost:3001/api/workflows", {
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
  const res = await fetch("http://localhost:3001/api/workflows");

  if (!res.ok) throw new Error("Failed to fetch workflows");

  return res.json();
}