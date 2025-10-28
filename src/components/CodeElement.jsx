export const CodeElement = ({ element, onUpdate }) => (
  <div
    className="bg-transparent rounded border-2 border-gray-300"
    style={{
      width: `${element.width}px`,
      height: `${element.height}px`,
    }}
  >
    <textarea
      value={element.content}
      onChange={(e) => onUpdate(element.id, e.target.value)}
      className="w-full h-full bg-transparent text-black font-mono text-sm resize-none focus:outline-none"
      style={{
        caretColor: "black",
        overflow: "hidden",
      }}
      rows={element.content.split("\n").length}
    />
  </div>
);
