import React from "react";

export default function NodeDraggable(props) {
  return (
    <div className="" onDragStart={props.onDragStart} draggable>
      {props.children}
    </div>
  );
}
