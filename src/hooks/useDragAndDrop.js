import { useState } from "react";

export const useDragAndDrop = (canvasRef, A4_WIDTH) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e, id, setSelectedId) => {
    if (e.target.tagName === "TEXTAREA" || e.target.contentEditable === "true")
      return;

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setSelectedId(id);
    setIsDragging(true);
  };

  const handleDrag = (e, selectedId, elements, updateElement) => {
    if (!isDragging || !selectedId) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const element = elements.find((el) => el.id === selectedId);

    let newX = e.clientX - canvasRect.left - dragOffset.x;
    let newY = e.clientY - canvasRect.top - dragOffset.y;

    newX = Math.max(0, Math.min(newX, A4_WIDTH - element.width));
    newY = Math.max(0, newY);

    updateElement(selectedId, { x: newX, y: newY });
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  return {
    isDragging,
    startDrag,
    handleDrag,
    endDrag,
    dragOffset,
    setDragOffset,
  };
};
