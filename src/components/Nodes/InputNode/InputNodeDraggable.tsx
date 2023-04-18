import React from "react";

export default function InputNodeDraggable(props) {
  return (
    <div className="" onDragStart={props.onDragStart} draggable>
      Input Node
    </div>
  );
}
