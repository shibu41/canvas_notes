export const ResizeHandles = ({ elementId, onResizeStart }) => {
  const handles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
  const positions = {
    nw: "top-0 left-0 cursor-nw-resize",
    n: "top-0 left-1/2 -translate-x-1/2 cursor-n-resize",
    ne: "top-0 right-0 cursor-ne-resize",
    e: "top-1/2 right-0 -translate-y-1/2 cursor-e-resize",
    se: "bottom-0 right-0 cursor-se-resize",
    s: "bottom-0 left-1/2 -translate-x-1/2 cursor-s-resize",
    sw: "bottom-0 left-0 cursor-sw-resize",
    w: "top-1/2 left-0 -translate-y-1/2 cursor-w-resize",
  };

  return (
    <>
      {handles.map((handle) => (
        <div
          key={handle}
          className={`absolute w-3 h-3 bg-blue-500 border-2 border-white rounded-full ${positions[handle]}`}
          onMouseDown={(e) => onResizeStart(e, elementId, handle)}
        />
      ))}
    </>
  );
};
