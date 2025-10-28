import { useState } from "react";

export const useCanvasElements = () => {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const addElement = (element) => {
    setElements((prev) => [...prev, element]);
  };

  const updateElement = (id, updates) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const deleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedId(null);
  };

  const getSelectedElement = () => {
    return elements.find((el) => el.id === selectedId);
  };

  return {
    elements,
    selectedId,
    setSelectedId,
    addElement,
    updateElement,
    deleteElement,
    getSelectedElement,
  };
};
