import React from "react";

import NodeDraggable from "./Nodes/NodeDraggable";

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const draggables = [
    {
      nodeType: "output",
      label: "Output node",
    },
    {
      nodeType: "input",
      label: "Input node",
    },
    {
      nodeType: "custom",
      label: "Custom node",
    },
    // add more nodes here as needed
  ];

  return (
    <div className="bg-white w-80 border-r border-gray-200">
      <div className="h-[54px] border-b border-gray-200 flex items-center px-4 box-border">
        umlow
      </div>
      <aside className="p-4">
        <div className="text-sm ">
          You can drag these nodes to the pane on the right - try it out!
        </div>
        <div className="mt-4">
          {draggables.map(({ nodeType, label }) => (
            <NodeDraggable
              key={nodeType}
              onDragStart={(event) => onDragStart(event, nodeType)}
            >
              {label}
            </NodeDraggable>
          ))}
        </div>
      </aside>
    </div>
  );
}
