"use client";

import { useWorkflowStore } from "@/store/workflowStore";
import { NodeType } from "@/types/nodeTypes";
import { Node, Edge } from "reactflow";
import { useEffect, useState } from "react";
import { getWorkflows } from "@/lib/api/workflow";

const nodeList: { label: string; type: NodeType }[] = [
  { label: "Text", type: "text" },
  { label: "Image", type: "image" },
  { label: "Video", type: "video" },
  { label: "LLM", type: "llm" },
  { label: "Crop", type: "crop" },
  { label: "Frame", type: "frame" },
];

/**
 * Raw shape coming from backend (JSON)
 */
type WorkflowRaw = {
  id: string;
  name: string;
  nodes: unknown;
  edges: unknown;
};

/**
 * Frontend-safe typed version
 */
type Workflow = {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
};

/**
 * Safe parser (no any)
 */
function parseWorkflow(raw: WorkflowRaw): Workflow {
  return {
    id: raw.id,
    name: raw.name,
    nodes: (raw.nodes as Node[]) || [],
    edges: (raw.edges as Edge[]) || [],
  };
}

export default function Sidebar() {
  const addNode = useWorkflowStore((s) => s.addNode);
  const runWorkflow = useWorkflowStore((s) => s.runWorkflow);
  const error = useWorkflowStore((s) => s.error);
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId);

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [workflowName, setWorkflowName] = useState("");

  useEffect(() => {
    getWorkflows()
      .then((data: WorkflowRaw[]) => {
        const parsed = data.map(parseWorkflow);
        setWorkflows(parsed);
      })
      .catch(console.error);
  }, []);

  const saveWorkflow = async () => {
    const { nodes, edges, currentWorkflowId, setWorkflowId } =
      useWorkflowStore.getState();

    try {
      const res = await fetch(
        currentWorkflowId
          ? `http://localhost:3001/api/workflows/${currentWorkflowId}`
          : "http://localhost:3001/api/workflows",
        {
          method: currentWorkflowId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: workflowName || "Untitled Workflow",
            nodes,
            edges,
          }),
        }
      );

      const data = await res.json();

      setWorkflowId(data.id);

      console.log("Saved:", data);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <aside className="w-64 h-full shrink-0 border-r border-gray-800 bg-[#111] p-4">
      <h2 className="text-lg font-semibold mb-4">Nodes</h2>

      <div className="space-y-2">

        <select
          onChange={(e) => {
            const selected = workflows.find(
              (w) => w.id === e.target.value
            );
            if (!selected) return;

            const { setWorkflowId } = useWorkflowStore.getState();

            setWorkflowId(selected.id);

            useWorkflowStore.setState({
              nodes: selected.nodes,
              edges: selected.edges,
            });
          }}
          className="w-full mb-4 bg-gray-800 p-2 rounded"
        >
          <option value="">Select Workflow</option>
          {workflows.map((wf) => (
            <option key={wf.id} value={wf.id}>
              {wf.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter workflow name..."
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          className="w-full mb-3 p-2 bg-gray-800 rounded"
        />
      
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
        ▶ Run {selectedNodeId ? "Selected Node" : "Workflow"}
      </button>

      <button
        onClick={saveWorkflow}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-500 transition p-2 rounded text-sm font-semibold"
      >
        Save Workflow
      </button>

      {error && (
        <div className="mt-4 text-sm bg-red-500/20 text-red-400 p-2 rounded border border-red-500/30">
          {error}
        </div>
      )}
    </aside>
  );
}