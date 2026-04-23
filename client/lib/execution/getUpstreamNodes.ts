import { Edge } from "reactflow";

export function getUpstreamNodes(
  targetId: string,
  edges: Edge[]
): Set<string> {
  const visited = new Set<string>();

  function dfs(nodeId: string) {
    for (const edge of edges) {
      if (edge.target === nodeId) {
        if (!visited.has(edge.source)) {
          visited.add(edge.source);
          dfs(edge.source);
        }
      }
    }
  }

  dfs(targetId);

  return visited;
}