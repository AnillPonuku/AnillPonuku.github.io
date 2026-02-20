import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Minus, Square, X } from "lucide-react";

const menuItems = [
  {
    label: "File",
    items: ["New Portfolio...", "Open Project", "Save As .creativity", "Export to PDF", "Print (on a T-shirt)", "Close Tab (just kidding)"],
  },
  {
    label: "Edit",
    items: ["Undo Bad Decisions", "Redo That Genius Idea", "Copy My Style", "Paste Inspiration", "Find Motivation", "Replace Coffee"],
  },
  {
    label: "Object",
    items: ["Transform Ideas", "Arrange Priorities", "Group Skills", "Lock Deadlines", "Expand Horizons", "Flatten Ego"],
  },
  {
    label: "Type",
    items: ["Create Outlines", "Find Font (again)", "Change Case", "Insert Special Character", "Comic Sans (never)"],
  },
  {
    label: "Select",
    items: ["Select All Projects", "Deselect Stress", "Inverse Selection", "Select Similar Vibes"],
  },
  {
    label: "Effect",
    items: ["Apply Creativity", "Gaussian Blur (Monday)", "Drop Shadow", "Inner Glow", "3D & Materials", "Stylize Everything"],
  },
  {
    label: "View",
    items: ["Zoom to Pixel", "Fit Artboard", "Show Grid", "Show Rulers", "Outline Mode", "GPU Preview"],
  },
  {
    label: "Window",
    items: ["Layers", "Properties", "Color", "Swatches", "Pathfinder", "Character"],
  },
  {
    label: "Help",
    items: ["About This Portfolio", "Hire Me!", "Keyboard Shortcuts", "Report a Bug (feature)", "Coffee Break"],
  },
];

interface TopToolbarProps {
  titleText?: string;
}

const TopToolbar = ({ titleText }: TopToolbarProps) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center h-8 bg-toolbar border-b border-border px-2 select-none">
      <div className="flex items-center gap-3 mr-4">
        <Home className="w-4 h-4 text-primary" />
      </div>

      <div className="flex items-center gap-0 relative">
        {menuItems.map((menu, idx) => (
          <div key={menu.label} className="relative">
            <button
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                idx === 0 ? "text-primary font-bold" : "text-toolbar-foreground hover:text-foreground"
              } ${openMenu === idx ? "bg-muted text-foreground" : ""}`}
              onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
              onMouseEnter={() => openMenu !== null && setOpenMenu(idx)}
            >
              {menu.label}
            </button>

            <AnimatePresence>
              {openMenu === idx && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 bg-popover border border-border rounded-sm shadow-xl min-w-[200px] py-1 z-[100]"
                >
                  {menu.items.map((item, i) => (
                    <button
                      key={i}
                      className="w-full text-left px-4 py-1.5 text-xs text-popover-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      {item}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="flex-1" />

      {titleText && (
        <span className="text-xs font-mono text-muted-foreground mr-4 hidden md:block">
          {titleText}
        </span>
      )}

      <div className="flex items-center gap-1 text-muted-foreground">
        <div className="w-3 h-3 flex items-center justify-center"><Minus className="w-3 h-3" /></div>
        <div className="w-3 h-3 flex items-center justify-center"><Square className="w-2.5 h-2.5" /></div>
        <div className="w-3 h-3 flex items-center justify-center hover:text-destructive"><X className="w-3 h-3" /></div>
      </div>

      {openMenu !== null && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  );
};

export default TopToolbar;
