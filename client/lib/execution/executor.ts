import { Node, Edge } from "reactflow";
import { NodeData } from "@/types/nodeTypes";

type ExecutionResult = {
  [nodeId: string]: NodeData;
};

export async function executeWorkflow(
  nodes: Node[],
  edges: Edge[],
  updateNode: (id: string, data: Partial<NodeData>) => void
) {
  const results: ExecutionResult = {};

  for (const node of nodes) {
    const inputs = edges
      .filter((e) => e.target === node.id)
      .map((e) => results[e.source]);

    let output: NodeData = {};

    switch (node.type) {
      case "text":
        output = {
          text: node.data?.text || "",
        };
        break;

      case "llm":
        const combinedInput = inputs
          .map((i) => i?.text || i?.user || "")
          .join(" ");

        output = {
          text: `[AI OUTPUT]: ${combinedInput} ${
            node.data?.user || ""
          }`,
        };
        break;

      default:
        output = node.data;
    }

    // simulate delay
    await new Promise((res) => setTimeout(res, 500));

    results[node.id] = output;

    updateNode(node.id, {
      ...output,
      status: "success",
    });
  }

  return results;
}