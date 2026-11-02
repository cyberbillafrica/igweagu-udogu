"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Keep small so content never feels held back. */
  delay?: number;
  distance?: number;
};

/**
 * A single, restrained entrance: content rises a little and fades in once.
 * Motion is disabled when the visitor prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0, distance = 22 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      transition={{ duration: reduceMotion ? 0.001 : 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
