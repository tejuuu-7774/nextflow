export type NodeType =
  | "text"
  | "image"
  | "video"
  | "llm"
  | "crop"
  | "frame";

export type NodeData = {
  label?: string;
  text?: string;
  system?: string;
  user?: string;
};
