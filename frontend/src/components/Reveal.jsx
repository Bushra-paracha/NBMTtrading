import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 24, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const Label = ({ children, className = "" }) => (
  <span className={`keyline inline-flex items-center gap-3 ${className}`}>
    <span className="h-px w-8 bg-gold inline-block" />
    {children}
  </span>
);
