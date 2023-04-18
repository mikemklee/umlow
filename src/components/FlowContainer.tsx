import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  ReactFlowInstance,
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

type NodeType = "input" | "default" | "output" | "custom";

const initialDataByNodeType: Record<NodeType, any> = {
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
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onInit = useCallback((reactFlowInstance: ReactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      if (!reactFlowInstance || !reactFlowWrapper.current) {
        return;
      }

      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData(
        "application/reactflow"
      ) as NodeType;

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
        proOptions={{
          hideAttribution: true,
        }}
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
}
