"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { Sparkles } from "@/components/ui/Sparkles";
import { sideCannons, burst } from "@/lib/celebrate";
import { NAME } from "@/lib/content";
import { ease } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const yName = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const blur = useTransform(scrollYProgress, [0, 0.8], ["blur(0px)", "blur(10px)"]);

  useEffect(() => {
    const t1 = setTimeout(() => sideCannons(1800), 1900);
    const t2 = setTimeout(() => burst({ x: 0.5, y: 0.42 }), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4">
      <Sparkles count={26} seed={7} />

      {/* soft floating lights */}
      {[
        "left-[8%] top-[22%] h-40 w-40 bg-lilac-500/25",
        "right-[10%] top-[30%] h-56 w-56 bg-blush-500/20",
        "bottom-[14%] left-[30%] h-32 w-32 bg-blush-300/20",
      ].map((cls, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`pointer-events-none absolute rounded-full blur-3xl ${cls}`}
          animate={{ y: [0, -30, 0], x: [0, i % 2 ? -20 : 20, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.div style={{ opacity, scale, filter: blur }} className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.35em] text-white/70"
          initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: ease.silk }}
          dir="ltr"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blush-400 shadow-[0_0_10px_#ff7ab8]" />
          A little gift, made by hand
        </motion.div>

        <motion.h1 style={{ y }} className="font-display leading-[0.85] tracking-tight" dir="ltr">
          <SplitText
            text="Happy Birthday"
            className="block text-[clamp(3.2rem,12vw,10.5rem)] text-white text-glow [perspective:600px]"
            delay={0.35}
            stagger={0.05}
          />
        </motion.h1>

        <motion.div style={{ y: yName }} className="relative -mt-2 sm:-mt-4" dir="ltr">
          <motion.span
            aria-hidden
            className="absolute inset-x-[10%] top-1/2 h-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-lilac-500/0 via-blush-500/40 to-lilac-500/0 blur-3xl"
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.6, duration: 1.6, ease: ease.silk }}
          />
          <motion.span
            className="text-gradient relative block pb-4 pr-[0.1em] font-display text-[clamp(6rem,26vw,17rem)] italic leading-[0.95]"
            initial={{ opacity: 0, y: 60, scale: 0.9, filter: "blur(24px)", letterSpacing: "0.12em" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", letterSpacing: "-0.02em" }}
            transition={{ duration: 2, delay: 1.1, ease: ease.silk }}
          >
            {NAME}
          </motion.span>
        </motion.div>

        <motion.p
          dir="rtl"
          className="mt-2 font-arabic text-lg font-light text-white/70 sm:text-2xl"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 2.4, ease: ease.silk }}
        >
          كل سنة وانتي طيبة يا فاطمة 🤍
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 1 }}
      >
        <span dir="rtl" className="font-arabic text-xs text-white/40">
          انزلي لتحت
        </span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-white/70"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
