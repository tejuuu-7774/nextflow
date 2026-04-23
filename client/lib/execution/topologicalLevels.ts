import { Node, Edge } from "reactflow";

export function getExecutionLevels(nodes: Node[], edges: Edge[]) {
  const inDegree: Record<string, number> = {};
  const adj: Record<string, string[]> = {};

  nodes.forEach((n) => {
    inDegree[n.id] = 0;
    adj[n.id] = [];
  });

  edges.forEach((e) => {
    adj[e.source].push(e.target);
    inDegree[e.target]++;
  });

  const levels: string[][] = [];
  let queue = Object.keys(inDegree).filter((id) => inDegree[id] === 0);

  while (queue.length > 0) {
    levels.push(queue);

    const next: string[] = [];

    for (const nodeId of queue) {
      for (const neighbor of adj[nodeId]) {
        inDegree[neighbor]--;

        if (inDegree[neighbor] === 0) {
          next.push(neighbor);
        }
      }
    }

    queue = next;
  }

  // cycle check
  const totalProcessed = levels.flat().length;
  if (totalProcessed !== nodes.length) {
    throw new Error("Cycle detected");
  }

  return levels;
}