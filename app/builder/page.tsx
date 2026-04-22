import Sidebar from "@/components/ui/Sidebar";
import RightPanel from "@/components/ui/RightPanel";
import FlowCanvas from "@/components/canvas/FlowCanvas";

export default function BuilderPage() {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <FlowCanvas />
      </div>

      <RightPanel />
    </div>
  );
}