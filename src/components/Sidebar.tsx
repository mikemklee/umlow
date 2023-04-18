import React from "react";

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="bg-green-200 w-72 p-4">
      umlow
      <aside>
        <div className="description">
          You can drag these nodes to the pane on the right.
        </div>
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "input")}
          draggable
        >
          Input Node
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          Default Node
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, "output")}
          draggable
        >
          Output Node
        </div>
      </aside>
    </div>
  );
}
