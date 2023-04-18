import React from "react";

export default function NodeDraggable(props) {
  return (
    <div
      className="mx-4 my-2 border rounded-md h-10 flex items-center overflow-clip"
      onDragStart={props.onDragStart}
      draggable
    >
      <div className="bg-red-200 h-full min-w-2 w-[6px]"></div>
      <div className="p-2">{props.children}</div>
    </div>
  );
}
