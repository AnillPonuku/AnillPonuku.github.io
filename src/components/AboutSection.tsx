import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const fields = [
  { label: "/Typography & Layout/", icon: "Aa" },
  { label: "/Social Media/", icon: "💬" },
  { label: "/Brand Identity/", icon: "🎨" },
];

const experience = [
  { period: "2020 - 2021", role: "Marketing Designer", company: "Goldsun Holdings" },
  { period: "2021 - 2022", role: "Graphic Designer", company: "MMIC Agency" },
  { period: "2020 - Present", role: "Freelancer", company: "Various Clients" },
  { period: "2022 - Present", role: "Senior Designer", company: "Creative Studio" },
];

const software = [
  { name: "Ps", label: "Photoshop", level: 92, years: 5 },
  { name: "Ai", label: "Illustrator", level: 95, years: 5 },
  { name: "Lr", label: "Lightroom", level: 78, years: 3 },
  { name: "Ae", label: "After Effects", level: 65, years: 2, learning: true },
  { name: "Bl", label: "Blender", level: 40, years: 1, learning: true },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  return (
    <section ref={ref} className="min-h-screen py-20 px-4 md:px-8 relative">
      <div className="max-w-5xl mx-auto">
        {/* Name */}
        <motion.h2
          className="text-6xl md:text-8xl font-black mb-4"
          initial={{ y: 80, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-foreground">Creative</span>{" "}
          <span className="text-primary">Designer</span>
        </motion.h2>

        {/* Bio with typewriter */}
        <motion.p
          className="text-secondary-foreground text-sm md:text-base max-w-lg mb-12 font-mono leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A passionate graphic designer with expertise in typography, social media design,
          and brand identity. Crafting visual stories that connect and inspire.
        </motion.p>

        {/* Creative Fields */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-foreground mb-4">Creative Field</h3>
          <div className="flex flex-wrap gap-3">
            {fields.map((field, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 cursor-pointer hover:border-primary transition-colors group"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.8 + idx * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg">{field.icon}</span>
                <span className="text-sm font-medium text-panel-foreground group-hover:text-primary italic">
                  {field.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-foreground mb-6">Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                className="bg-card border border-border rounded-lg p-4 cursor-pointer group perspective"
                initial={{ x: idx % 2 === 0 ? -60 : 60, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 1 + idx * 0.15 }}
                whileHover={{ rotateY: 5, scale: 1.02 }}
                onClick={() => setFlippedCard(flippedCard === idx ? null : idx)}
              >
                <span className="text-xs font-mono text-primary">{exp.period}</span>
                <h4 className="text-sm font-bold text-foreground mt-1">{exp.role}</h4>
                <span className="text-xs text-muted-foreground">{exp.company}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Software */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6">Software</h3>
          <div className="flex flex-wrap gap-6">
            {software.map((sw, idx) => (
              <motion.div
                key={idx}
                className="relative group cursor-pointer"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1.5 + idx * 0.1, type: "spring" }}
              >
                {/* Circular progress */}
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(0 0% 20%)" strokeWidth="3" />
                    <motion.circle
                      cx="32" cy="32" r="28" fill="none"
                      stroke={sw.learning ? "hsl(20 100% 55%)" : "hsl(191 100% 50%)"}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                      animate={isInView ? {
                        strokeDashoffset: 2 * Math.PI * 28 * (1 - sw.level / 100)
                      } : {}}
                      transition={{ delay: 1.8 + idx * 0.1, duration: 1 }}
                    />
                  </svg>
                  <div className={`absolute inset-0 flex items-center justify-center text-sm font-black ${
                    sw.learning ? "text-orange-accent" : "text-foreground"
                  }`}>
                    {sw.name}
                  </div>
                  {sw.learning && (
                    <div className="absolute inset-0 rounded-full animate-pulse-glow pointer-events-none" />
                  )}
                </div>

                {/* Hover tooltip */}
                <motion.div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-popover border border-border rounded px-2 py-1 text-[10px] text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                >
                  <div className="font-bold text-foreground">{sw.label}</div>
                  <div className="text-primary">{sw.level}% · {sw.years}yr{sw.years > 1 ? "s" : ""}</div>
                  {sw.learning && <div className="text-orange-accent">Currently learning</div>}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative bounding box on right */}
        <motion.div
          className="absolute top-32 right-8 w-64 h-80 border-2 border-dashed border-primary/20 pointer-events-none hidden xl:block"
          animate={{ rotate: [0, 0.5, -0.5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1",
            "top-1/2 -left-1 -translate-y-1/2", "top-1/2 -right-1 -translate-y-1/2",
            "-top-1 left-1/2 -translate-x-1/2", "-bottom-1 left-1/2 -translate-x-1/2"
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-2 h-2 bg-primary/60 border border-background`}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
