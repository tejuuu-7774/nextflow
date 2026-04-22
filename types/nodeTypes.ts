export type NodeType =
  | "text"
  | "image"
  | "video"
  | "llm"
  | "crop"
  | "frame";

export type NodeStatus = "idle" | "running" | "success" | "error";

export type NodeData = {
  label?: string;

  // input fields
  text?: string;
  system?: string;
  user?: string;

  // execution fields
  output?: string;
  status?: NodeStatus;
};