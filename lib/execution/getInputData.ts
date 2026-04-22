import { Edge, Node } from "reactflow";
import { NodeData } from "@/types/nodeTypes";

export function getInputData(
  nodeId: string,
  nodes: Node[],
  edges: Edge[]
) {
  const incomingEdges = edges.filter(
    (edge) => edge.target === nodeId
  );

  const inputs: NodeData[] = [];

  for (const edge of incomingEdges) {
    const sourceNode = nodes.find(
      (n) => n.id === edge.source
    );

    if (sourceNode) {
      inputs.push(sourceNode.data as NodeData);
    }
  }

  return inputs;
}