import { Node, Edge } from "reactflow";

export function topologicalSort(nodes: Node[], edges: Edge[]) {
  const inDegree: Record<string, number> = {};
  const adj: Record<string, string[]> = {};

  // init
  nodes.forEach((node) => {
    inDegree[node.id] = 0;
    adj[node.id] = [];
  });

  // build graph
  edges.forEach((edge) => {
    adj[edge.source].push(edge.target);
    inDegree[edge.target]++;
  });

  // queue (nodes with no dependencies)
  const queue: string[] = [];

  Object.keys(inDegree).forEach((id) => {
    if (inDegree[id] === 0) {
      queue.push(id);
    }
  });

  const result: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    for (const neighbor of adj[current]) {
      inDegree[neighbor]--;

      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // cycle check
  if (result.length !== nodes.length) {
    throw new Error("Cycle detected in workflow");
  }

  return result;
}