import { NodeType, NodeData } from "@/types/nodeTypes";
import { create } from "zustand";
import {
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Connection,
  NodeChange,
  EdgeChange,
} from "reactflow";
import { getExecutionLevels } from "@/lib/execution/topologicalLevels";
import { WorkflowRun, NodeExecution } from "@/types/workFlow";
import { getUpstreamNodes } from "@/lib/execution/getUpstreamNodes";

type WorkflowState = {
  nodes: Node[];
  edges: Edge[];
  error: string | null;
  history: WorkflowRun[];
  selectedNodeId: string | null;
  
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  
  addNode: (type: NodeType) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
  
  runWorkflow: () => Promise<void>;
  setError: (msg: string | null) => void;
  addRun: (run: WorkflowRun) => void;

  setSelectedNode: (id: string | null) => void;
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  error: null,
  history: [],
  selectedNodeId: null,

  setSelectedNode: (id) => set({ selectedNodeId: id }),

  addRun: (run) =>
    set((state) => ({
      history: [run, ...state.history],
    })),

  setError: (msg) => set({ error: msg }),
  onNodesChange: (changes) =>
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    }),

  onEdgesChange: (changes) =>
    set({
      edges: applyEdgeChanges(changes, get().edges),
    }),

  onConnect: (connection) =>
    set({
      edges: addEdge(connection, get().edges),
    }),

  addNode: (type) => {
    const id = `${type}-${Date.now()}`;

    const newNode: Node = {
      id,
      type,
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      data: {
        label: type.toUpperCase(),
        status: "idle",
      },
    };

    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },

  updateNodeData: (id, newData) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...(node.data as NodeData),
                ...newData,
              },
            }
          : node
      ),
    })),

  runWorkflow: async () => {
    const { nodes, edges, updateNodeData, setError, addRun, selectedNodeId } = get();

    setError(null);

    let levels: string[][] = [];

    // 🔥 STEP 1 — determine which nodes to execute
    let executionNodeIds = nodes.map((n) => n.id);

    if (selectedNodeId) {
      const upstream = getUpstreamNodes(selectedNodeId, edges);

      executionNodeIds = [
        selectedNodeId,
        ...Array.from(upstream),
      ];
    }

    // 🔥 STEP 2 — filter nodes + edges
    const filteredNodes = nodes.filter((n) =>
      executionNodeIds.includes(n.id)
    );

    const filteredEdges = edges.filter(
      (e) =>
        executionNodeIds.includes(e.source) &&
        executionNodeIds.includes(e.target)
    );

    try {
      levels = getExecutionLevels(filteredNodes, filteredEdges);
    } catch {
      setError("Cycle detected! Fix your connections.");
      return;
    }

    const nodeMap = Object.fromEntries(
      filteredNodes.map((n) => [n.id, n])
    );

    const results: Record<string, NodeData> = {};

    const runId = `run-${Date.now()}`;
    const runStart = Date.now();

    const nodeExecutions: Record<string, NodeExecution> = {};

    try {
      for (const level of levels) {
        await Promise.all(
          level.map(async (nodeId) => {
            const node = nodeMap[nodeId];

            const start = Date.now();

            nodeExecutions[nodeId] = {
              id: nodeId,
              type: node.type!,
              status: "running",
              startedAt: start,
            };

            updateNodeData(nodeId, { status: "running" });

            await new Promise((res) =>
              setTimeout(res, 500 + Math.random() * 1000)
            );

            let output = "";

            if (node.type === "text") {
              output = (node.data as NodeData).text || "";
            }

            if (node.type === "llm") {
              const inputs = filteredEdges
                .filter((e) => e.target === nodeId)
                .map((e) => results[e.source]);

              const inputText = inputs
                ?.map((d) => d?.text || "")
                .join(" ");

              output = `AI Response: ${inputText}`;
            }

            results[nodeId] = { output, text: output };

            nodeExecutions[nodeId] = {
              ...nodeExecutions[nodeId],
              status: "success",
              output,
              endedAt: Date.now(),
            };

            updateNodeData(nodeId, {
              status: "success",
              output,
            });
          })
        );
      }

      const runEnd = Date.now();

      addRun({
        id: runId,
        timestamp: runStart,
        status: "success",
        duration: runEnd - runStart,
        nodes: Object.values(nodeExecutions),
      });

    } catch {
      addRun({
        id: runId,
        timestamp: runStart,
        status: "failed",
        nodes: Object.values(nodeExecutions),
      });

      setError("Execution failed");
    }
  }
}));