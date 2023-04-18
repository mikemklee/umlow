import React from "react";

import NodeDraggable from "../Nodes/NodeDraggable";
import CollapsiblePanel from "../CollapsiblePanel";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const draggables = [
    {
      color: "#f2ad0d",
      nodeType: "output",
      label: "Output node",
    },
    {
      color: "#644db3",
      nodeType: "input",
      label: "Input node",
    },
    {
      color: "#b34d70",
      nodeType: "custom",
      label: "Custom node",
    },
    // add more nodes here as needed
  ];

  return (
    <div className="bg-white w-80 border-r border-gray-200 flex flex-col">
      <div className={styles.sitename}>umlow</div>
      <aside className="border-t border-gray-200">
        <CollapsiblePanel title="nodes">
          {draggables.map(({ nodeType, color, label }) => (
            <NodeDraggable
              key={nodeType}
              color={color}
              onDragStart={(event) => onDragStart(event, nodeType)}
            >
              {label}
            </NodeDraggable>
          ))}
        </CollapsiblePanel>
      </aside>
    </div>
  );
}
