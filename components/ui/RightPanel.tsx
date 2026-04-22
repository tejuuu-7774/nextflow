"use client";

import { useWorkflowStore } from "@/store/workflowStore";

export default function RightPanel() {
  const history = useWorkflowStore((s) => s.history);

  return (
    <aside className="w-80 h-full shrink-0 border-l border-gray-800 bg-[#111] p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Workflow History</h2>

      {history.length === 0 ? (
        <div className="text-sm text-gray-400">No runs yet</div>
      ) : (
        <div className="space-y-3">
          {history.map((run) => (
            <div
              key={run.id}
              className="border border-gray-700 p-3 rounded bg-[#1a1a1a]"
            >
              <div className="flex justify-between text-sm">
                <span>
                  {new Date(run.timestamp).toLocaleTimeString()}
                </span>
                <span
                  className={
                    run.status === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {run.status}
                </span>
              </div>

              <div className="text-xs text-gray-400 mt-1">
                Duration: {run.duration} ms
              </div>

              <div className="mt-2 text-xs text-gray-300">
                Nodes:
                <ul className="mt-1 space-y-1">
                  {run.nodes.map((n) => (
                    <li key={n.id}>
                      {n.type} — {n.status}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}