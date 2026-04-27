"use client";

import { useState } from "react";
import { useWorkflowStore } from "@/store/workflowStore";
import {
  DEFAULT_LLM_MODEL,
  DEFAULT_LLM_PROVIDER,
  LLM_MODELS,
  LLMProvider,
  NodeData,
} from "@/types/nodeTypes";

const MODEL_LABELS: Record<string, string> = {
  "gemini-2.0-flash": "gemini-2.0-flash",
  "gemini-2.5-flash": "gemini-2.5-flash",
  "llama-3.3-70b-versatile": "llama-3.3-70b-versatile",
  "mixtral-8x7b-32768": "mixtral-8x7b-32768",
};

export default function RightPanel() {
  const history = useWorkflowStore((s) => s.history);
  const nodes = useWorkflowStore((s) => s.nodes);
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId);
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

  const [expandedRunId, setExpandedRunId] = useState<string | null>(null);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const data = selectedNode?.data as NodeData;
  const llmProvider = data?.llmProvider ?? DEFAULT_LLM_PROVIDER;
  const modelOptions = LLM_MODELS[llmProvider];
  const llmModel = modelOptions.includes(data?.llmModel ?? "")
    ? data.llmModel
    : llmProvider === DEFAULT_LLM_PROVIDER
      ? DEFAULT_LLM_MODEL
      : modelOptions[0];

  const toggleRun = (id: string) => {
    setExpandedRunId((prev) => (prev === id ? null : id));
  };

  return (
    <aside className="relative z-10 h-full w-80 shrink-0 overflow-y-auto border-l border-gray-800 bg-[#111] p-4 space-y-6">
      
      {/* ========================= */}
      {/* NODE SETTINGS */}
      {/* ========================= */}
      {selectedNode && (
        <div className="bg-[#1a1a1a] p-3 rounded border border-gray-800">
          <h2 className="text-sm font-semibold mb-3">Node Settings</h2>

          {/* TEXT NODE */}
          {selectedNode.type === "text" && (
            <>
              <label className="text-xs">Text</label>
              <textarea
                value={data?.text || ""}
                onChange={(e) =>
                  updateNodeData(selectedNode.id, {
                    text: e.target.value,
                  })
                }
                className="w-full mt-1 p-2 bg-gray-800 rounded text-sm"
              />
            </>
          )}

          {/* LLM NODE */}
          {selectedNode.type === "llm" && (
            <>
              <label className="text-xs">Provider</label>
              <select
                value={llmProvider}
                onChange={(e) => {
                  const nextProvider = e.target.value as LLMProvider;

                  updateNodeData(selectedNode.id, {
                    llmProvider: nextProvider,
                    llmModel: LLM_MODELS[nextProvider][0],
                  });
                }}
                className="w-full p-2 mt-1 bg-gray-800 rounded text-sm"
              >
                <option value="gemini">Gemini</option>
                <option value="groq">Groq</option>
              </select>

              <label className="text-xs mt-3 block">Model</label>
              <select
                value={llmModel}
                onChange={(e) =>
                  updateNodeData(selectedNode.id, {
                    llmModel: e.target.value,
                  })
                }
                className="w-full p-2 mt-1 bg-gray-800 rounded text-sm"
              >
                {modelOptions.map((model) => (
                  <option key={model} value={model}>
                    {MODEL_LABELS[model]}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      )}

      {/* ========================= */}
      {/* WORKFLOW HISTORY */}
      {/* ========================= */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Workflow History</h2>

        {history.length === 0 && (
          <div className="text-sm text-gray-400">No runs yet</div>
        )}

        <div className="space-y-3">
          {history.map((run) => {
            const isOpen = expandedRunId === run.id;

            return (
              <div
                key={run.id}
                className="bg-[#1a1a1a] rounded p-3 border border-gray-800"
              >
                {/* HEADER */}
                <div
                  onClick={() => toggleRun(run.id)}
                  className="cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <div className="text-sm font-medium">
                      {new Date(run.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      Duration: {run.duration ?? 0} ms
                    </div>
                  </div>

                  <div
                    className={`text-xs font-semibold ${
                      run.status === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {run.status}
                  </div>
                </div>

                {/* DETAILS */}
                {isOpen && (
                  <div className="mt-3 border-t border-gray-800 pt-3 space-y-2">
                    {run.nodes.map((node) => {
                      const duration =
                        node.endedAt && node.startedAt
                          ? node.endedAt - node.startedAt
                          : 0;

                      return (
                        <div key={node.id} className="text-xs">
                          <div className="flex justify-between">
                            <span className="font-medium">
                              {node.type} ({node.id})
                            </span>

                            <span
                              className={`${
                                node.status === "success"
                                  ? "text-green-400"
                                  : node.status === "failed"
                                  ? "text-red-400"
                                  : "text-yellow-400"
                              }`}
                            >
                              {node.status}
                            </span>
                          </div>

                          <div className="text-gray-400">
                            {duration} ms
                          </div>

                          {node.output && (
                            <div className="mt-1 text-gray-300 bg-[#0d0d0d] p-2 rounded">
                              {node.output}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
