"use client";

import BaseNode from "./BaseNode";

export default function LLMNode() {
  return (
    <BaseNode label="LLM">
      <div className="space-y-2">
        <input
          placeholder="System prompt..."
          className="w-full bg-[#111] border border-gray-700 rounded p-1 text-xs"
        />
        <input
          placeholder="User input..."
          className="w-full bg-[#111] border border-gray-700 rounded p-1 text-xs"
        />
      </div>
    </BaseNode>
  );
}