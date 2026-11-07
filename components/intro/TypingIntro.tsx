"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { graphemes, sleep, ease } from "@/lib/utils";

type Props = {
  lines: string[];
  onDone: () => void;
};

/**
 * Pitch-black opening. Each sentence types itself out, rests,
 * then dissolves into blur before the next one begins.
 */
export function TypingIntro({ lines, onDone }: Props) {
  const [index, setIndex] = useState(-1);
  const [typed, setTyped] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await sleep(1400); // pure black first
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        const chars = graphemes(lines[i]);
        setIndex(i);
        setVisible(true);
        setTyped("");
        await sleep(350);
        for (let c = 1; c <= chars.length; c++) {
          if (cancelled) return;
          setTyped(chars.slice(0, c).join(""));
          const ch = chars[c - 1];
          // human rhythm: slower on punctuation and spaces
          const delay = /[.،,…]/.test(ch) ? 260 : ch === " " ? 95 : 55 + Math.random() * 55;
          await sleep(delay);
        }
        await sleep(i === lines.length - 1 ? 1500 : 1700);
        if (cancelled) return;
        setVisible(false);
        await sleep(1100);
      }
      if (!cancelled) onDone();
    })();

    return () => {
      cancelled = true;
    };
  }, [lines, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-40 grid place-items-center bg-black px-6"
      exit={{ opacity: 0, transition: { duration: 1.2, ease: ease.inOut } }}
    >
      {/* a faint breathing glow behind the words */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[40vmin] w-[80vmin] rounded-full bg-[radial-gradient(ellipse,rgba(139,92,246,0.18),transparent_70%)] blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: index >= 0 ? [0.4, 0.8, 0.4] : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        {index >= 0 && visible && (
          <motion.p
            key={index}
            dir="rtl"
            className="relative max-w-3xl text-center font-arabic text-3xl font-light leading-relaxed text-white/90 text-glow sm:text-5xl"
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(14px)", scale: 1.02 }}
            transition={{ duration: 0.9, ease: ease.silk }}
          >
            {typed}
            <span className="ms-1 inline-block h-[0.9em] w-[2px] translate-y-[0.12em] animate-caret bg-blush-300 align-baseline shadow-[0_0_10px_rgba(255,122,184,0.9)]" />
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onDone}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[11px] uppercase tracking-[0.3em] text-white/20 transition-colors hover:text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        skip
      </motion.button>
    </motion.div>
  );
}
