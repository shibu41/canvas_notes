import { Move } from "lucide-react";

export const EmptyCanvas = () => (
  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg pointer-events-none">
    <div className="text-center">
      <Move size={48} className="mx-auto mb-2" />
      <p>Click buttons above to add elements</p>
      <p className="text-sm">or paste images directly (Ctrl+V)</p>
    </div>
  </div>
);
