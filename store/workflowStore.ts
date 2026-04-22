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

type WorkflowState = {
  nodes: Node[];
  edges: Edge[];
  error: string | null;

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  addNode: (type: NodeType) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;

  runWorkflow: () => Promise<void>;
  setError: (msg: string | null) => void;
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  error: null,

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
      console.log("RUN WORKFLOW PARALLEL");

      const { nodes, edges, updateNodeData, setError } = get();

      setError(null);

      let levels: string[][] = [];

      try {
        levels = getExecutionLevels(nodes, edges);
      } catch{
        setError("Cycle detected! Fix your connections.");
        return;
      }

      const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
      const results: Record<string, NodeData> = {};

      // runs level by level
      for (const level of levels) {
        console.log("LEVEL START:", level);
        await Promise.all(
          
          level.map(async (nodeId) => {
            const node = nodeMap[nodeId];
            
            console.log("START:", nodeId);

            updateNodeData(nodeId, { status: "running" });

            await new Promise((res) => setTimeout(res, 800));

            let output = "";

            if (node.type === "text") {
              output = (node.data as NodeData).text || "";
            }

            if (node.type === "llm") {
              const inputs = edges
                .filter((e) => e.target === nodeId)
                .map((e) => results[e.source]);

              const inputText = inputs
                ?.map((d) => d?.text || "")
                .join(" ");

              output = `AI Response: ${inputText}`;
            }

            results[nodeId] = { output, text: output };

            updateNodeData(nodeId, {
              status: "success",
              output,
            });

            console.log("END:", nodeId);
          })
        );
        console.log("LEVEL DONE:", level);
      }
    }
}));