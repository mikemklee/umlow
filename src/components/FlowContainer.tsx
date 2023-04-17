import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

export default function Flow() {
  return (
    <ReactFlow>
      <Background />
      <Controls />
    </ReactFlow>
  );
}
