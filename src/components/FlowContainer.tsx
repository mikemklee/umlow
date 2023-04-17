import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

function Flow() {
  return (
    <ReactFlow>
      <Background />
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
