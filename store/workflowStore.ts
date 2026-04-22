// /store/workflowStore.ts
import { NodeType } from "@/types/nodeTypes";
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

  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (type: NodeType) => void;
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

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
            type: "default",
            position: {
              x: Math.random() * 400 + 100,
              y: Math.random() * 400 + 100,
            },
            data: {
              label: type.toUpperCase(),
            },
          };

          set((state) => ({
            nodes: [...state.nodes, newNode],
          }));
    },
}));