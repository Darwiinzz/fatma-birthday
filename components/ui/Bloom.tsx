"use client";

import { motion } from "framer-motion";

/**
 * A circle of light that blooms out from where she tapped YES,
 * floods the screen, then dissolves into the gift.
 */
export function Bloom({ origin, onCovered }: { origin: { x: number; y: number }; onCovered: () => void }) {
  // radius that reaches the farthest corner, in px so the clip-path interpolates smoothly
  const radius =
    typeof window === "undefined"
      ? 3000
      : Math.ceil(
          Math.hypot(Math.max(origin.x, window.innerWidth - origin.x), Math.max(origin.y, window.innerHeight - origin.y)),
        ) + 40;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.35, duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at var(--x) var(--y), #fff 0%, #ffd1e8 12%, #c9a8ff 30%, #6d3fe0 55%, #0a0614 85%)",
          ["--x" as string]: `${origin.x}px`,
          ["--y" as string]: `${origin.y}px`,
        }}
        initial={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
        animate={{ clipPath: `circle(${radius}px at ${origin.x}px ${origin.y}px)` }}
        transition={{ duration: 1.25, ease: [0.7, 0, 0.2, 1] }}
        onAnimationComplete={onCovered}
      />
    </motion.div>
  );
}
