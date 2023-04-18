import React, { useState, ReactNode, useRef, useEffect } from "react";

interface CollapsiblePanelProps {
  title: string;
  children: ReactNode;
}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const transitionStyles = {
    maxHeight: `${height}px`,
    transition: "max-height 300ms ease-in-out, opacity 300ms ease-in-out",
    opacity: isOpen ? 1 : 0,
    overflow: "hidden",
  };

  return (
    <div className="border border-gray-300 rounded-md shadow-md overflow-hidden">
      <div
        className="cursor-pointer bg-gray-200 p-4 rounded-t-md"
        onClick={togglePanel}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div ref={contentRef} style={transitionStyles} className="">
        {children}
      </div>
    </div>
  );
};

export default CollapsiblePanel;
