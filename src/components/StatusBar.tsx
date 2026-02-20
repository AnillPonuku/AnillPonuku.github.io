import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface StatusBarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const StatusBar = ({ zoom, onZoomIn, onZoomOut }: StatusBarProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-6 bg-toolbar border-t border-border z-50 flex items-center px-2 text-[10px] font-mono select-none">
      <div className="flex items-center gap-1">
        <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-sm font-bold">
          {zoom}%
        </span>
      </div>

      <div className="flex items-center gap-1 ml-3">
        <button onClick={onZoomOut} className="text-toolbar-foreground hover:text-foreground p-0.5">
          <Minus className="w-3 h-3" />
        </button>
        <button onClick={onZoomIn} className="text-toolbar-foreground hover:text-foreground p-0.5">
          <Plus className="w-3 h-3" />
        </button>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <ChevronLeft className="w-3 h-3 text-toolbar-foreground cursor-pointer hover:text-foreground" />
        <span className="text-toolbar-foreground">1</span>
        <ChevronRight className="w-3 h-3 text-toolbar-foreground cursor-pointer hover:text-foreground" />
      </div>

      <div className="flex-1 flex items-center justify-center gap-4">
        <span className="text-muted-foreground">Selection</span>
        <Play className="w-3 h-3 text-primary" />
      </div>

      <div className="flex items-center gap-3 text-muted-foreground">
        <span>X: <span className="text-primary">{mousePos.x}</span></span>
        <span>Y: <span className="text-primary">{mousePos.y}</span></span>
      </div>
    </div>
  );
};

export default StatusBar;
