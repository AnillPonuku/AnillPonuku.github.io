import { motion } from "framer-motion";
import { useState } from "react";

const HeroSection = () => {
  const letters = ["p", "o", "r", "t", "f", "o", "l", "i", "o"];
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Bezier curve SVG */}
      <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 1200 800">
        <motion.path
          d="M200,400 C350,200 500,500 700,350"
          fill="none"
          stroke="hsl(191 100% 50% / 0.3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        {/* Control point handles */}
        <motion.circle cx="350" cy="200" r="4" fill="hsl(191 100% 50%)"
          animate={{ cy: [200, 250, 200] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.circle cx="500" cy="500" r="4" fill="hsl(191 100% 50%)"
          animate={{ cy: [500, 450, 500] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
        <motion.line x1="200" y1="400" x2="350" y2="200" stroke="hsl(191 100% 50% / 0.2)" strokeWidth="1"
          animate={{ y2: [200, 250, 200] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.line x1="700" y1="350" x2="500" y2="500" stroke="hsl(191 100% 50% / 0.2)" strokeWidth="1"
          animate={{ y2: [500, 450, 500] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
      </svg>

      {/* Ai Ps badges */}
      <div className="absolute top-32 left-[15%] flex gap-3 z-10">
        <motion.div
          className="bg-card border border-border rounded px-3 py-1.5 text-sm font-bold text-foreground cursor-pointer"
          whileHover={{ rotate: [-5, 5, -5, 0], transition: { duration: 0.4 } }}
        >
          Ai
        </motion.div>
        <motion.div
          className="bg-card border border-border rounded px-3 py-1.5 text-sm font-bold text-foreground cursor-pointer"
          whileHover={{ rotate: [5, -5, 5, 0], transition: { duration: 0.4 } }}
        >
          Ps
        </motion.div>
      </div>

      {/* #1 badge */}
      <motion.div
        className="absolute top-28 right-[15%] text-primary text-4xl font-black z-10"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ textShadow: "0 0 30px hsl(191 100% 50% / 0.5)" }}
      >
        #1
      </motion.div>

      {/* Main portfolio text */}
      <div className="flex items-baseline z-10 select-none">
        {letters.map((letter, idx) => (
          <motion.span
            key={idx}
            className={`font-black cursor-pointer transition-colors ${
              idx === 4 ? "font-display italic text-primary text-[8rem] md:text-[12rem]" : "text-foreground text-[5rem] md:text-[8rem]"
            } ${hoveredLetter === idx ? "text-glow-cyan text-primary" : ""}`}
            initial={{ opacity: 0, y: 60, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: idx * 0.08,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            onMouseEnter={() => setHoveredLetter(idx)}
            onMouseLeave={() => setHoveredLetter(null)}
            whileHover={{ scale: 1.1 }}
            style={idx === 4 ? { animation: "float 3s ease-in-out infinite" } : {}}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Graphics Designer badge */}
      <motion.div
        className="mt-6 z-10 border border-primary rounded-lg px-6 py-2 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <TypewriterText text="Graphics Designer" />
      </motion.div>

      {/* Pen tool cursor following bezier */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        animate={{
          x: [200, 350, 500, 700],
          y: [400, 220, 480, 350],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L8 22L12 17L16 22L12 2Z" fill="hsl(191 100% 50%)" stroke="hsl(191 100% 50%)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Selection handles decoration */}
      <div className="absolute top-1/4 right-1/4 w-48 h-32 border border-dashed border-primary/30 pointer-events-none hidden lg:block">
        {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-2 h-2 bg-primary border border-primary-foreground`} />
        ))}
      </div>

      {/* Marquee ticker */}
      <div className="absolute bottom-8 left-0 right-0 overflow-hidden z-10">
        <div className="marquee flex gap-8 whitespace-nowrap">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className={`text-2xl font-black ${
                i % 2 === 0 ? "text-primary" : "text-foreground/30"
              }`}
            >
              portfolio
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const TypewriterText = ({ text }: { text: string }) => {
  return (
    <span className="font-mono text-primary text-lg tracking-wider">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 + i * 0.06 }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-0.5 h-5 bg-primary ml-0.5"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
};

export default HeroSection;
