import FlowContainer from "@/components/FlowContainer";
import Sidebar from "@/components/Sidebar";

import { ReactFlowProvider } from "reactflow";

export default function Home() {
  return (
    <main className="flex min-h-screen ">
      <ReactFlowProvider>
        <Sidebar />
        <FlowContainer />
      </ReactFlowProvider>
    </main>
  );
}
