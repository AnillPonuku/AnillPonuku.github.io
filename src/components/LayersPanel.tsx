import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ChevronDown } from "lucide-react";

const layers = [
  { name: "Portfolio", type: "Group", visible: true },
  { name: "<Text>", type: "Text", visible: true },
  { name: "<Symbol>", type: "Symbol", visible: true },
  { name: "<Path>", type: "Path", visible: true },
  { name: "<Text>", type: "Text", visible: true },
  { name: "<Group>", type: "Group", visible: true },
  { name: "<Path>", type: "Path", visible: false },
  { name: "<Rectangle>", type: "Shape", visible: true },
  { name: "<Rectangle>", type: "Shape", visible: true },
  { name: "<Rectangle>", type: "Shape", visible: true },
  { name: "<Line>", type: "Line", visible: true },
  { name: "<Rectangle>", type: "Shape", visible: true },
  { name: "<Rectangle>", type: "Shape", visible: false },
  { name: "<Rectangle>", type: "Shape", visible: true },
  { name: "<Path>", type: "Path", visible: true },
];

const LayersPanel = () => {
  const [layerVisibility, setLayerVisibility] = useState(
    layers.map((l) => l.visible)
  );
  const [selectedLayer, setSelectedLayer] = useState(0);

  const toggleVisibility = (idx: number) => {
    setLayerVisibility((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <div className="fixed right-0 top-8 w-48 bg-toolbar border-l border-border z-40 hidden lg:flex flex-col" style={{ height: 'calc(100vh - 32px - 24px)' }}>
      <div className="border-b border-border px-2 py-1.5">
        <span className="text-[10px] font-semibold text-foreground">Properties</span>
      </div>

      <div className="border-b border-border px-2 py-1.5 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-foreground">Layer</span>
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </div>

      <div className="flex-1 overflow-y-auto panel-scroll">
        {layers.map((layer, idx) => (
          <motion.div
            key={idx}
            className={`flex items-center gap-1 px-1 py-0.5 cursor-pointer text-[9px] border-l-2 transition-colors ${
              selectedLayer === idx
                ? "bg-primary/20 border-l-primary text-foreground"
                : "border-l-transparent text-panel-foreground hover:bg-panel-hover"
            }`}
            onClick={() => setSelectedLayer(idx)}
            whileHover={{ x: 2 }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleVisibility(idx);
              }}
              className="w-3 h-3 flex items-center justify-center"
            >
              {layerVisibility[idx] ? (
                <Eye className="w-2.5 h-2.5" />
              ) : (
                <EyeOff className="w-2.5 h-2.5 text-muted-foreground" />
              )}
            </button>
            <Lock className="w-2 h-2 text-muted-foreground" />
            <span
              className={`flex-1 truncate ${
                !layerVisibility[idx] ? "opacity-40 line-through" : ""
              }`}
            >
              {layer.name}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-border">
        {["Libraries", "Pathfinder", "Character"].map((panel) => (
          <div
            key={panel}
            className="px-2 py-1.5 text-[10px] text-panel-foreground border-b border-border hover:bg-panel-hover cursor-pointer transition-colors"
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayersPanel;
