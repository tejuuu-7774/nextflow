export type NodeExecution = {
  id: string;
  type: string;
  status: "success" | "failed" | "running";
  output?: string;
  startedAt: number;
  endedAt?: number;
};

export type WorkflowRun = {
  id: string;
  timestamp: number;
  status: "success" | "failed" | "running";
  duration?: number;
  nodes: NodeExecution[];
};