import React from "react";

interface Props {
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  color: string;
  children: React.ReactNode;
}

const NodeDraggable: React.FC<Props> = (props) => {
  return (
    <div
      className="mx-4 my-2 border rounded-md h-10 flex items-center overflow-clip cursor-pointer hover:bg-gray-50 transition-colors"
      onDragStart={props.onDragStart}
      draggable
    >
      <div
        className="h-full min-w-2 w-[6px]"
        style={{ backgroundColor: props.color }}
      ></div>
      <div className="p-2">{props.children}</div>
    </div>
  );
};

export default NodeDraggable;
