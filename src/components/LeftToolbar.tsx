import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MousePointer2, Pen, Type, Square, Circle,
  Pencil, Eraser, Hand, Search, Pipette,
  Scissors, RotateCw
} from "lucide-react";

const tools = [
  { icon: MousePointer2, label: "Selection Tool (V)", shortcut: "v" },
  { icon: Pen, label: "Pen Tool (P)", shortcut: "p" },
  { icon: Type, label: "Type Tool (T)", shortcut: "t" },
  { icon: Square, label: "Rectangle Tool (M)", shortcut: "m" },
  { icon: Circle, label: "Ellipse Tool (L)", shortcut: "l" },
  { icon: Pencil, label: "Pencil Tool (N)", shortcut: "n" },
  { icon: Eraser, label: "Eraser Tool (E)", shortcut: "e" },
  { icon: Hand, label: "Hand Tool (H)", shortcut: "h" },
  { icon: Search, label: "Zoom Tool (Z)", shortcut: "z" },
  { icon: Pipette, label: "Eyedropper (I)", shortcut: "i" },
  { icon: Scissors, label: "Scissors Tool (C)", shortcut: "c" },
  { icon: RotateCw, label: "Rotate Tool (R)", shortcut: "r" },
];

const LeftToolbar = () => {
  const [activeTool, setActiveTool] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const idx = tools.findIndex((t) => t.shortcut === e.key.toLowerCase());
      if (idx !== -1) setActiveTool(idx);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed left-0 top-8 bottom-6 w-10 bg-toolbar border-r border-border z-40 flex flex-col items-center py-2 gap-0.5 hidden md:flex">
      {tools.map((tool, idx) => {
        const Icon = tool.icon;
        const isActive = activeTool === idx;
        return (
          <div key={idx} className="relative">
            <motion.button
              className={`w-8 h-8 flex items-center justify-center rounded-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-toolbar-foreground hover:text-foreground hover:bg-muted"
              }`}
              onClick={() => setActiveTool(idx)}
              onMouseEnter={() => setHoveredTool(idx)}
              onMouseLeave={() => setHoveredTool(null)}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-4 h-4" />
              {isActive && (
                <motion.div
                  layoutId="tool-glow"
                  className="absolute inset-0 rounded-sm box-glow-cyan pointer-events-none"
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>

            {hoveredTool === idx && (
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded whitespace-nowrap z-50 border border-border"
              >
                {tool.label}
              </motion.div>
            )}
          </div>
        );
      })}

      <div className="mt-auto flex flex-col items-center gap-1">
        <div className="w-6 h-6 bg-foreground border border-border" />
        <div className="w-6 h-6 bg-transparent border border-muted-foreground" style={{ marginTop: -8, marginLeft: 4 }} />
      </div>
    </div>
  );
};

export default LeftToolbar;
