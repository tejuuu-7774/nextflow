"use client";

import { useState } from "react";
import { useWorkflowStore } from "@/store/workflowStore";

export default function RightPanel() {
  const history = useWorkflowStore((s) => s.history);

  const [expandedRunId, setExpandedRunId] = useState<string | null>(null);

  const toggleRun = (id: string) => {
    setExpandedRunId((prev) => (prev === id ? null : id));
  };

  return (
    <aside className="relative z-10 h-full w-80 shrink-0 overflow-y-auto border-l border-gray-800 bg-[#111] p-4">
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

              {/* EXPANDED VIEW */}
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
    </aside>
  );
}