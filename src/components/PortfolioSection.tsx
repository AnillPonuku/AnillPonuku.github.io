import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";

const categories = ["All", "Typography", "Social Media", "Brand Identity", "UI/UX"];

const projects = [
  { title: "Brand Refresh", category: "Brand Identity", color: "from-primary/20 to-cyan-glow/10", desc: "Complete visual identity overhaul for a tech startup" },
  { title: "Social Campaign", category: "Social Media", color: "from-orange-accent/20 to-primary/10", desc: "Instagram campaign reaching 500K impressions" },
  { title: "Type Specimen", category: "Typography", color: "from-primary/30 to-background", desc: "Custom typeface design and specimen booklet" },
  { title: "App Interface", category: "UI/UX", color: "from-primary/20 to-muted/30", desc: "Mobile banking app redesign" },
  { title: "Poster Series", category: "Typography", color: "from-orange-accent/10 to-primary/20", desc: "Minimalist poster series for art exhibition" },
  { title: "Logo Collection", category: "Brand Identity", color: "from-primary/15 to-card", desc: "30 logo designs for various industries" },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section ref={ref} className="min-h-screen py-20 px-4 md:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl font-black mb-8"
          initial={{ y: 60, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
        >
          <span className="text-foreground">My </span>
          <span className="text-primary">Works</span>
        </motion.h2>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`px-4 py-1.5 rounded-sm text-xs font-mono font-medium transition-all ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground box-glow-cyan"
                  : "bg-card border border-border text-panel-foreground hover:text-foreground hover:border-primary"
              }`}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`relative bg-gradient-to-br ${project.color} border border-border rounded-lg overflow-hidden cursor-pointer group aspect-[4/3]`}
                onClick={() => setSelectedProject(idx)}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
              >
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-3xl font-black text-foreground/20 mb-2">{String(idx + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                  <span className="text-xs text-primary font-mono mt-1">{project.category}</span>
                </div>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <h3 className="text-lg font-bold text-foreground mb-1">{project.title}</h3>
                  <p className="text-xs text-secondary-foreground mb-3 text-center">{project.desc}</p>
                  <span className="text-[10px] font-mono bg-primary text-primary-foreground px-3 py-1 rounded-sm">
                    Open File →
                  </span>
                </motion.div>

                {/* Selection handles on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {["-top-px -left-px", "-top-px -right-px", "-bottom-px -left-px", "-bottom-px -right-px"].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-2 h-2 border border-primary bg-background`} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Rulers */}
            <div className="absolute top-0 left-8 right-0 h-6 bg-toolbar border-b border-border flex items-center">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-8 border-r border-border/30 h-full flex items-end justify-start px-0.5">
                  <span className="text-[7px] text-muted-foreground">{i * 50}</span>
                </div>
              ))}
            </div>
            <div className="absolute left-0 top-6 bottom-0 w-6 bg-toolbar border-r border-border flex flex-col items-center">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 h-8 border-b border-border/30 w-full flex items-start justify-center">
                  <span className="text-[7px] text-muted-foreground rotate-0">{i * 50}</span>
                </div>
              ))}
            </div>

            <motion.div
              className="bg-card border border-border rounded-lg p-12 max-w-2xl w-full mx-8 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-6xl font-black text-foreground/10 block mb-4">
                {String(selectedProject + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {filtered[selectedProject]?.title}
              </h3>
              <span className="text-xs font-mono text-primary mb-4 block">
                {filtered[selectedProject]?.category}
              </span>
              <p className="text-sm text-secondary-foreground">
                {filtered[selectedProject]?.desc}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
