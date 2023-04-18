import React from "react";

import OutputNodeDraggable from "./Nodes/OutputNode/OutputNodeDraggable";
import InputNodeDraggable from "./Nodes/InputNode/InputNodeDraggable";
import CustomNodeDraggable from "./Nodes/CustomNode/CustomNodeDraggable";

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const draggables = [
    { DraggableComponent: OutputNodeDraggable, nodeType: "output" },
    { DraggableComponent: InputNodeDraggable, nodeType: "input" },
    { DraggableComponent: CustomNodeDraggable, nodeType: "custom" },
    // add more nodes here as needed
  ];

  return (
    <div className="bg-green-200 w-80 border-r border-gray-200">
      <div className="h-14 border-b border-gray-200 flex items-center px-4">
        umlow
      </div>
      <aside className="p-4">
        <div className="text-sm ">
          You can drag these nodes to the pane on the right - try it out!
        </div>
        <div className="mt-4">
          {draggables.map(({ DraggableComponent, nodeType }) => (
            <DraggableComponent
              key={nodeType}
              onDragStart={(event) => onDragStart(event, nodeType)}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}
