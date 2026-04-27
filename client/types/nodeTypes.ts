export type NodeType =
  | "text"
  | "image"
  | "video"
  | "llm"
  | "crop"
  | "frame";

export type NodeStatus = "idle" | "running" | "success" | "error";

export type LLMProvider = "gemini" | "groq";

export const DEFAULT_LLM_PROVIDER: LLMProvider = "gemini";
export const DEFAULT_LLM_MODEL = "gemini-2.0-flash";

export const LLM_MODELS: Record<LLMProvider, string[]> = {
  gemini: ["gemini-2.0-flash", "gemini-2.5-flash"],
  groq: ["llama-3.3-70b-versatile", "mixtral-8x7b-32768"],
};

export type NodeData = {
  label?: string;

  // input fields
  text?: string;
  system?: string;
  user?: string;

  // execution fields
  output?: string;
  status?: NodeStatus;

  // LLM selection
  llmProvider?: LLMProvider;
  llmModel?: string;
};
