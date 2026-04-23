"use client";

import { Handle, Position } from "reactflow";

type Props = {
  label: string;
  children?: React.ReactNode;
};

export default function BaseNode({ label, children }: Props) {
  return (
    <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-md min-w-[180px]">
      
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-700 text-sm font-semibold">
        {label}
      </div>

      {/* Content */}
      <div className="p-3 text-xs text-gray-300">
        {children}
      </div>

      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-white"
      />

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-white"
      />
    </div>
  );
}