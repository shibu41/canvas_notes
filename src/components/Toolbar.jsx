import { Code, Type, Download, Image } from "lucide-react";

export const Toolbar = ({
  onAddImage,
  onAddCode,
  onAddText,
  onExportPDF,
  fileInputRef,
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
    <h1 className="text-2xl font-bold mb-4">A4 Canvas Editor</h1>

    <div className="flex gap-2 mb-4">
      <button
        onClick={() => fileInputRef.current.click()}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <Image size={20} />
        Add Image
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onAddImage}
        className="hidden"
      />

      <button
        onClick={onAddCode}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        <Code size={20} />
        Add Code
      </button>

      <button
        onClick={onAddText}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        <Type size={20} />
        Add Text
      </button>

      <button
        onClick={onExportPDF}
        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 ml-auto"
      >
        <Download size={20} />
        Export PDF
      </button>
    </div>

    <p className="text-sm text-gray-600 mb-4">
      Tip: Paste images (Ctrl+V) • Drag to move • Drag handles to resize •
      Export to PDF
    </p>
  </div>
);
