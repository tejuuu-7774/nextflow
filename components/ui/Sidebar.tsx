export default function Sidebar() {
  return (
    <div className="w-64 bg-[#111] border-r border-gray-800 p-4">
      <h2 className="text-lg font-semibold mb-4">Nodes</h2>

      <div className="space-y-2">
        <button className="w-full bg-gray-800 p-2 rounded">Text</button>
        <button className="w-full bg-gray-800 p-2 rounded">Image</button>
        <button className="w-full bg-gray-800 p-2 rounded">Video</button>
        <button className="w-full bg-gray-800 p-2 rounded">LLM</button>
        <button className="w-full bg-gray-800 p-2 rounded">Crop</button>
        <button className="w-full bg-gray-800 p-2 rounded">Frame</button>
      </div>
    </div>
  );
}