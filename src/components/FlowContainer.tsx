import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";

import CustomNode from "./Nodes/CustomNode/CustomNode";
import InputNode from "./Nodes/InputNode/InputNode";
import OutputNode from "./Nodes/OutputNode/OutputNode";

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialDataByNodeType = {
  input: {
    label: "Input Node",
  },
  default: {
    label: "Default Node",
  },
  output: {
    label: "Output Node",
  },
  custom: {
    label: "Custom Node",
    selects: {
      "handle-0": "smoothstep",
      "handle-1": "smoothstep",
    },
  },
};

export default function FlowContainer() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onInit = useCallback((reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      if (!reactFlowInstance || !reactFlowWrapper.current) {
        return;
      }

      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const initialNodeData = initialDataByNodeType[type];

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { ...initialNodeData },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="reactflow-wrapper w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
}
