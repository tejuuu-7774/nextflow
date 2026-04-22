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

type WorkflowState = {
  nodes: Node[];
  edges: Edge[];

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  addNode: (type: NodeType) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;

  runWorkflow: () => Promise<void>;
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],

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
    const { nodes, edges, updateNodeData } = get();

    for (const node of nodes) {
      // 🔥 set running
      updateNodeData(node.id, { status: "running" });

      await new Promise((res) => setTimeout(res, 600));

      let output = "";

      if (node.type === "text") {
        output = (node.data as NodeData).text || "";
      }

      if (node.type === "llm") {
        const inputs = edges
          .filter((e) => e.target === node.id)
          .map((e) =>
            nodes.find((n) => n.id === e.source)?.data
          );

        const inputText = inputs
          ?.map((d) => (d as NodeData)?.text || "")
          .join(" ");

        output = `AI Response: ${inputText}`;
      }

      // set to success
      updateNodeData(node.id, {
        status: "success",
        output,
      });
    }
  },
}));