"use client";

import BaseNode from "./BaseNode";
import { useWorkflowStore } from "@/store/workflowStore";
import { NodeProps } from "reactflow";
import { NodeData } from "@/types/nodeTypes";

export default function TextNode({ id, data }: NodeProps<NodeData>) {
  const updateNodeData = useWorkflowStore(
    (state) => state.updateNodeData
  );

  return (
    <BaseNode label="Text">
      <textarea
        value={data?.text || ""}
        onChange={(e) =>
          updateNodeData(id, { text: e.target.value })
        }
        placeholder="Enter text..."
        className="w-full bg-[#111] border border-gray-700 rounded p-1 text-xs"
      />
    </BaseNode>
  );
}