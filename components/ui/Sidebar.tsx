"use client";

import { useWorkflowStore } from "@/store/workflowStore";
import { NodeType } from "@/types/nodeTypes";

const nodeList: { label: string; type: NodeType }[] = [
  { label: "Text", type: "text" },
  { label: "Image", type: "image" },
  { label: "Video", type: "video" },
  { label: "LLM", type: "llm" },
  { label: "Crop", type: "crop" },
  { label: "Frame", type: "frame" },
];

export default function Sidebar() {
  const addNode = useWorkflowStore((s) => s.addNode);
  const runWorkflow = useWorkflowStore((s) => s.runWorkflow);

  return (
    <aside className="w-64 h-full shrink-0 border-r border-gray-800 bg-[#111] p-4">
      <h2 className="text-lg font-semibold mb-4">Nodes</h2>

      <div className="space-y-2">
        {nodeList.map((node) => (
          <button
            key={node.type}
            onClick={() => addNode(node.type)}
            className="w-full bg-gray-800 hover:bg-gray-700 transition p-2 rounded text-left"
          >
            {node.label}
          </button>
        ))}
      </div>

      <button
        onClick={runWorkflow}
        className="w-full mt-4 bg-green-600 hover:bg-green-500 transition p-2 rounded text-sm font-semibold"
      >
        ▶ Run Workflow
      </button>
    </aside>
  );
}