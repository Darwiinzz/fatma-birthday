"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  flipped: boolean;
  onClick: () => void;
  front: ReactNode;
  back: ReactNode;
  className?: string;
  label: string;
};

/**
 * A reusable 3D card: tilts toward the cursor, catches light,
 * and flips on click to reveal its back face.
 */
export function FlipCard({ flipped, onClick, front, back, className, label }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 18 });
  const sy = useSpring(py, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const rotateY = useTransform(sx, [0, 1], [-12, 12]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.22), transparent 55%)`;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-label={label}
      aria-pressed={flipped}
      className={cn("group relative block w-full cursor-pointer select-none outline-none [perspective:1400px]", className)}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {/* ground glow */}
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-lilac-500/0 to-blush-500/0 opacity-0 blur-2xl transition-all duration-700 group-hover:from-lilac-500/40 group-hover:to-blush-500/40 group-hover:opacity-100" />

      <motion.div className="relative h-full w-full [transform-style:preserve-3d]" style={{ rotateX, rotateY }}>
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, mass: 1.1 }}
        >
          {/* FRONT */}
          <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
            {front}
            <motion.div className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: glare }} />
          </div>

          {/* BACK */}
          <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
            {back}
            <motion.div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: glare }} />
          </div>
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
