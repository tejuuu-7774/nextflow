"use client";

import BaseNode from "./BaseNode";

export default function TextNode() {
  return (
    <BaseNode label="Text">
      <textarea
        placeholder="Enter text..."
        className="w-full bg-[#111] border border-gray-700 rounded p-1 text-xs"
      />
    </BaseNode>
  );
}