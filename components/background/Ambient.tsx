"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { Particles } from "./Particles";

/**
 * The living background: aurora light blobs, floating dust,
 * a soft spotlight that follows the cursor, grain and vignette.
 */
export function Ambient() {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const x = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Aurora */}
      <div className="absolute -left-[20%] -top-[25%] h-[75vmax] w-[75vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgba(109,63,224,0.45),transparent_62%)] blur-3xl" />
      <div className="absolute -right-[25%] top-[10%] h-[65vmax] w-[65vmax] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(240,79,155,0.28),transparent_60%)] blur-3xl" />
      <div className="absolute -bottom-[35%] left-[15%] h-[70vmax] w-[70vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.3),transparent_60%)] blur-3xl [animation-delay:-8s]" />

      {/* Cursor spotlight */}
      <motion.div
        className="absolute h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,168,255,0.13),transparent_60%)]"
        style={{ left: x, top: y }}
      />

      <Particles />

      {/* Grain + vignette */}
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,3,10,0.85)_100%)]" />
    </div>
  );
}
