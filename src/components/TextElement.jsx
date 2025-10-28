export const TextElement = ({ element, onUpdate }) => (
  <div
    className="bg-transparent rounded p-2 border-2 border-yellow-300"
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
