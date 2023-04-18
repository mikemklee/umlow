import FlowContainer from "@/components/FlowContainer";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import { ReactFlowProvider } from "reactflow";

export default function Home() {
  return (
    <main className="flex min-h-screen ">
      <ReactFlowProvider>
        <Sidebar />
        <div className="w-full h-screen flex flex-col">
          <Topbar />
          <FlowContainer />
        </div>
      </ReactFlowProvider>
    </main>
  );
}
