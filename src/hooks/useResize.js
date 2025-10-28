import { useState } from "react";
import { MIN_ELEMENT_SIZE } from "../utils/constants";

export const useResize = (A4_WIDTH) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [resizeOffset, setResizeOffset] = useState({ x: 0, y: 0 });

  const startResize = (e, id, handle, setSelectedId) => {
    e.stopPropagation();
    setSelectedId(id);
    setIsResizing(true);
    setResizeHandle(handle);
    setResizeOffset({ x: e.clientX, y: e.clientY });
  };

  const handleResize = (e, selectedId, elements, updateElement) => {
    if (!isResizing || !selectedId) return;

    const element = elements.find((el) => el.id === selectedId);
    const deltaX = e.clientX - resizeOffset.x;
    const deltaY = e.clientY - resizeOffset.y;

    let newWidth = element.width;
    let newHeight = element.height;
    let newX = element.x;
    let newY = element.y;

    if (resizeHandle.includes("e")) {
      newWidth = Math.max(
        MIN_ELEMENT_SIZE,
        Math.min(element.width + deltaX, A4_WIDTH - element.x)
      );
    }
    if (resizeHandle.includes("w")) {
      const maxDelta = element.width - MIN_ELEMENT_SIZE;
      const actualDelta = Math.min(deltaX, maxDelta);
      if (element.x + actualDelta >= 0) {
        newWidth = element.width - actualDelta;
        newX = element.x + actualDelta;
      }
    }
    if (resizeHandle.includes("s")) {
      newHeight = Math.max(MIN_ELEMENT_SIZE, element.height + deltaY);
    }
    if (resizeHandle.includes("n")) {
      const maxDelta = element.height - MIN_ELEMENT_SIZE;
      const actualDelta = Math.min(deltaY, maxDelta);
      if (element.y + actualDelta >= 0) {
        newHeight = element.height - actualDelta;
        newY = element.y + actualDelta;
      }
    }

    updateElement(selectedId, {
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    });

    setResizeOffset({ x: e.clientX, y: e.clientY });
  };

  const endResize = () => {
    setIsResizing(false);
    setResizeHandle(null);
  };

  return { isResizing, resizeHandle, startResize, handleResize, endResize };
};
