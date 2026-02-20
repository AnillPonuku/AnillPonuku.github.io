import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  const socials = [
    { name: "Behance", icon: "Be" },
    { name: "Instagram", icon: "Ig" },
    { name: "LinkedIn", icon: "Li" },
  ];

  return (
    <section ref={ref} className="min-h-screen py-20 px-4 md:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl font-black mb-8"
          initial={{ y: 60, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
        >
          <span className="text-foreground">Get in </span>
          <span className="text-primary">Touch</span>
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {/* Name field */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-3 py-1 border-b border-border bg-toolbar">
              <span className="text-[10px] font-mono text-muted-foreground">Name</span>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              className="w-full bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Email field */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-3 py-1 border-b border-border bg-toolbar">
              <span className="text-[10px] font-mono text-muted-foreground">Email</span>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Message field */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-3 py-1 border-b border-border bg-toolbar">
              <span className="text-[10px] font-mono text-muted-foreground">Message</span>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              rows={5}
              className="w-full bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={status !== "idle"}
            className={`w-full py-3 rounded-lg font-mono text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              status === "sent"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-primary text-primary-foreground hover:box-glow-cyan"
            }`}
            whileHover={status === "idle" ? { scale: 1.02 } : {}}
            whileTap={status === "idle" ? { scale: 0.98 } : {}}
          >
            {status === "idle" && (
              <>
                <Send className="w-4 h-4" />
                Export & Send
              </>
            )}
            {status === "sending" && (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exporting file...
              </>
            )}
            {status === "sent" && (
              <>
                <Check className="w-4 h-4" />
                File Sent Successfully!
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href="#"
              className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-sm font-bold text-panel-foreground hover:text-primary hover:border-primary transition-colors"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Live preview of name */}
        {name && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-[10px] font-mono text-muted-foreground">
              📁 {name}'s File — Ready to send
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
