"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Fireworks } from "./Fireworks";
import { Sparkles } from "@/components/ui/Sparkles";
import { SplitText } from "@/components/ui/SplitText";
import { burst, sideCannons, snowfall } from "@/lib/celebrate";
import { finale } from "@/lib/content";
import { ease } from "@/lib/utils";

export function Finale({ onReplay }: { onReplay: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let stopSnow = () => {};
    const timers = [
      setTimeout(() => sideCannons(2200), 2200),
      setTimeout(() => burst({ x: 0.5, y: 0.5 }), 3000),
      setTimeout(() => {
        stopSnow = snowfall(14000);
      }, 3600),
    ];
    return () => {
      timers.forEach(clearTimeout);
      stopSnow();
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.section
      className="fixed inset-0 z-[58] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      transition={{ duration: 2.2, ease: ease.inOut }}
      aria-label="Happy birthday"
    >
      {/* slow fade to night */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,#2a1450_0%,#0a0614_55%,#000_100%)]" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 2 }} className="absolute inset-0">
        <Fireworks />
      </motion.div>

      {/* floating stars */}
      <Sparkles count={40} seed={21} />
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,209,232,0.8)]"
          style={{ left: `${(i * 37) % 100}%`, bottom: "-2%" }}
          animate={{ y: ["0vh", "-110vh"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 12 + (i % 5) * 2, delay: 2 + i * 0.7, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h2 className="font-display leading-[0.9] tracking-tight" dir="ltr">
          <SplitText
            text={finale.title}
            className="block text-[clamp(3rem,13vw,12rem)] text-white text-glow [perspective:600px]"
            delay={2.2}
            stagger={0.08}
          />
        </h2>

        <motion.div
          aria-hidden
          className="mt-4 h-px w-40 bg-gradient-to-r from-transparent via-blush-300 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 3.8, duration: 1.4, ease: ease.silk }}
        />

        <motion.p
          className="text-gradient mt-6 max-w-xl font-display text-2xl italic sm:text-4xl"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 4.4, duration: 1.6, ease: ease.silk }}
          dir="ltr"
        >
          {finale.subtitle}
        </motion.p>

        <motion.button
          type="button"
          onClick={onReplay}
          className="glass mt-14 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 8, duration: 1, ease: ease.silk }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Back to the gift
        </motion.button>
      </div>
    </motion.section>
  );
}
