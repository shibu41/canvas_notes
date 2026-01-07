import { useRef } from "react";
import { useCanvasElements } from "../hooks/useCanvasElements";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { A4_WIDTH } from "../utils/constants";
import { useResize } from "../hooks/useResize";
import {
  calculateCanvasHeight,
  calculateContentDimensions,
  findNextPosition,
} from "../utils/canvasHelpers";
import { Toolbar } from "./Toolbar";
import { EmptyCanvas } from "./EmptyCanvas";
import { CanvasElement } from "./CanvasElement";

function A4Canvas() {
  const {
    elements,
    selectedId,
    setSelectedId,
    addElement,
    updateElement,
    deleteElement,
    deleteAllElements
  } = useCanvasElements();

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const { startDrag, handleDrag, endDrag } = useDragAndDrop(
    canvasRef,
    A4_WIDTH
  );

  const { isResizing, startResize, handleResize, endResize } =
    useResize(A4_WIDTH);

  // Event Handlers
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const pos = findNextPosition(elements, A4_WIDTH);
        addElement({
          id: Date.now(),
          type: "image",
          src: event.target.result,
          x: pos.x,
          y: pos.y,
          width: 200,
          height: 150,
        });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          const pos = findNextPosition(elements, A4_WIDTH);
          addElement({
            id: Date.now(),
            type: "image",
            src: event.target.result,
            x: pos.x,
            y: pos.y,
            width: 200,
            height: 150,
          });
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  const handleAddCode = () => {
    const pos = findNextPosition(elements, A4_WIDTH);
    addElement({
      id: Date.now(),
      type: "code",
      content: '// Write your code here\nconsole.log("Hello World");',
      x: pos.x,
      y: pos.y,
      width: 300,
      height: 150,
    });
  };

  const handleAddText = () => {
    const pos = findNextPosition(elements, A4_WIDTH);
    addElement({
      id: Date.now(),
      type: "text",
      content: "Double click to edit text",
      x: pos.x,
      y: pos.y,
      width: 250,
      height: 50,
      fontSize: 16,
    });
  };

  const handleUpdateContent = (id, content) => {
    const element = elements.find((el) => el.id === id);
    if (element && (element.type === "code" || element.type === "text")) {
      const dimensions = calculateContentDimensions(
        content,
        element.x,
        A4_WIDTH
      );
      updateElement(id, { content, ...dimensions });
    } else {
      updateElement(id, { content });
    }
  };

  const handleExportPDF = () => {
    setSelectedId(null);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to remove all elements in the canvas?\nThis action is permanent and cannot be undone'))
      deleteAllElements();
    else
      return;
  }

  const handleMouseMove = (e) => {
    if (!isResizing) {
      handleDrag(e, selectedId, elements, updateElement);
    } else {
      handleResize(e, selectedId, elements, updateElement);
    }
  };

  const handleMouseUp = () => {
    endDrag();
    endResize();
  };

  const handleMouseDown = (e, id) => {
    e.stopPropagation();
    startDrag(e, id, setSelectedId);
  };

  const handleResizeStart = (e, id, handle) => {
    startResize(e, id, handle, setSelectedId);
  };

  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current || e.target.id === 'canvas-print') {
      setSelectedId(null);
    }
  };

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #canvas-print, #canvas-print * {
            visibility: visible;
          }
          #canvas-print {
            position: absolute;
            left: 0;
            top: 0;
            overflow: hidden !important;
          }
          @page {
      margin: 0;
      size: A4; 
    }
    
    body {
      margin: 0;
      padding: 0;
    }
        }
        @media screen {
          #canvas-print {
            overflow: auto;
          }
        }
      `}</style>

      <div className="flex bg-gray-100 p-8 overflow-y-auto">

        <Toolbar
          onAddImage={handleAddImage}
          onAddCode={handleAddCode}
          onAddText={handleAddText}
          onExportPDF={handleExportPDF}
          fileInputRef={fileInputRef}
          deleteAllElements={handleClearAll}
        />

        <div
          id="canvas-print"
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="relative bg-white shadow-2xl ml-auto overflow-hidden rounded-lg"
          style={{
            width: `${A4_WIDTH}px`,
            height: `${calculateCanvasHeight(elements)}px`,
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onPaste={handlePaste}
          tabIndex={0}
        >
          {elements.map((element) => (
            <CanvasElement
              key={element.id}
              element={element}
              isSelected={selectedId === element.id}
              onMouseDown={(e) => handleMouseDown(e, element.id)}
              onDelete={deleteElement}
              onResizeStart={handleResizeStart}
              onUpdateContent={handleUpdateContent}
            />
          ))}

          {elements.length === 0 && <EmptyCanvas />}
        </div>
      </div>

    </>
  );
}

export default A4Canvas;
