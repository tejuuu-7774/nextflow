"use client";

import BaseNode from "./BaseNode";
import { useWorkflowStore } from "@/store/workflowStore";
import { NodeProps } from "reactflow";
import { NodeData } from "@/types/nodeTypes";
import { getInputData } from "@/lib/execution/getInputData";

export default function LLMNode({ id, data }: NodeProps<NodeData>) {
  const updateNodeData = useWorkflowStore(
    (state) => state.updateNodeData
  );

  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);

  const inputs = getInputData(id, nodes, edges);

  return (
    <BaseNode label="LLM">
      <div className="space-y-2">

        {/* Incoming Data Preview */}
        {inputs.length > 0 && (
          <div className="text-[10px] text-green-400">
            Inputs:
            {inputs.map((input, i) => (
              <div key={i}>
                {input.text || input.user || "data"}
              </div>
            ))}
          </div>
        )}

        <input
          value={data?.system || ""}
          onChange={(e) =>
            updateNodeData(id, { system: e.target.value })
          }
          placeholder="System prompt..."
          className="w-full bg-[#111] border border-gray-700 rounded p-1 text-xs"
        />

        <input
          value={data?.user || ""}
          onChange={(e) =>
            updateNodeData(id, { user: e.target.value })
          }
          placeholder="User input..."
          className="w-full bg-[#111] border border-gray-700 rounded p-1 text-xs"
        />
      </div>
    </BaseNode>
  );
}