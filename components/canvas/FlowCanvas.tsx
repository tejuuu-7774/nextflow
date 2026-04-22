"use client";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowStore } from "@/store/workflowStore";
import { nodeTypes } from "./nodeTypes";

export default function FlowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectedNodeId,
    setSelectedNode,
  } = useWorkflowStore();

  // Added visual selection highlight
  const styledNodes: Node[] = nodes.map((node) => ({
    ...node,
    style:
      node.id === selectedNodeId
        ? {
            border: "2px solid #22c55e",
            boxShadow: "0 0 10px #22c55e",
          }
        : {},
  }));

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={styledNodes}  
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => {
          console.log("SELECTED NODE:", node.id);
          setSelectedNode(node.id);
        }}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background gap={20} size={1} color="#1a1a1a" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}