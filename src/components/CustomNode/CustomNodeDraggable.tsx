import React from "react";

export default function CustomNodeDraggable(props) {
  return (
    <div className="" onDragStart={props.onDragStart} draggable>
      Custom Node
    </div>
  );
}
