import Sidebar from "@/components/ui/Sidebar";
import RightPanel from "@/components/ui/RightPanel";
import FlowCanvas from "@/components/canvas/FlowCanvas";

export default function BuilderPage() {
  return (
    <div className="h-screen w-full flex overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Center Canvas */}
      <div className="flex-1 bg-[#0b0b0b]">
        <FlowCanvas />
      </div>

      {/* Right Panel */}
      <RightPanel />
    </div>
  );
}