// /components/canvas/FlowCanvas.tsx
"use client";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowStore } from "@/store/workflowStore";

export default function FlowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useWorkflowStore();

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background gap={20} size={1} color="#1a1a1a" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}