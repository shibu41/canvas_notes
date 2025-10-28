import { Trash2 } from "lucide-react";
import { CodeElement } from "./CodeElement";
import { ImageElement } from "./ImageElement";
import { ResizeHandles } from "./ResizeHandles";
import { TextElement } from "./TextElement";

export const CanvasElement = ({
  element,
  isSelected,
  onMouseDown,
  onDelete,
  onResizeStart,
  onUpdateContent,
}) => {
  return (
    <div
      className={`absolute cursor-move ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        width: `${element.width}px`,
        height: `${element.height}px`,
      }}
      onMouseDown={onMouseDown}
    >
      {element.type === "image" && <ImageElement element={element} />}
      {element.type === "code" && (
        <CodeElement element={element} onUpdate={onUpdateContent} />
      )}
      {element.type === "text" && (
        <TextElement element={element} onUpdate={onUpdateContent} />
      )}

      {isSelected && (
        <>
          <ResizeHandles elementId={element.id} onResizeStart={onResizeStart} />
          <button
            onClick={() => onDelete(element.id)}
            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
          >
            <Trash2 size={16} />
          </button>
        </>
      )}
    </div>
  );
};
