import React, { useState, ReactNode, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
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
    <div className="overflow-hidden">
      <div
        className="cursor-pointer px-4 py-3 rounded-t-md flex items-center justify-between"
        onClick={togglePanel}
      >
        <h2 className="font-semibold">{title}</h2>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      <div
        ref={contentRef}
        style={transitionStyles}
        className={`${isOpen ? " border-t" : "border-t"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsiblePanel;
