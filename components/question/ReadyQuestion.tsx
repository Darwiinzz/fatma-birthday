"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Gift } from "lucide-react";
import { useState } from "react";
import { question } from "@/lib/content";
import { cn, ease } from "@/lib/utils";

type Props = {
  /** Called synchronously inside the click so audio is allowed to start. */
  onYes: (origin: { x: number; y: number }) => void;
};

/** How the buttons evolve every time she says NO. */
const stages = [
  { yesGrow: 1, yesText: "text-base", noScale: 1 },
  { yesGrow: 1.15, yesText: "text-base", noScale: 0.96 },
  { yesGrow: 1.35, yesText: "text-lg", noScale: 0.92 },
  { yesGrow: 1.6, yesText: "text-lg", noScale: 0.86 },
  { yesGrow: 3, yesText: "text-xl", noScale: 0.7 },
  { yesGrow: 7, yesText: "text-2xl", noScale: 0.45 },
  { yesGrow: 24, yesText: "text-3xl", noScale: 0.28 },
];

export function ReadyQuestion({ onYes }: Props) {
  const [noCount, setNoCount] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0, r: 0 });
  const stage = stages[Math.min(noCount, stages.length - 1)];
  const reply = noCount > 0 ? question.noReplies[Math.min(noCount - 1, question.noReplies.length - 1)] : null;

  const handleNo = () => {
    setNoCount((n) => n + 1);
    // a little dodge, but never off the card
    const sign = () => (Math.random() > 0.5 ? 1 : -1);
    setOffset({
      x: sign() * (14 + Math.random() * 22),
      y: sign() * (6 + Math.random() * 12),
      r: sign() * (3 + Math.random() * 6),
    });
  };

  const handleYes = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onYes({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <motion.section
      className="fixed inset-0 z-30 grid place-items-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <motion.div
        className="glass glow-border relative w-full max-w-md overflow-hidden rounded-[2rem] px-6 pb-7 pt-10 sm:px-9 sm:pb-9 sm:pt-12"
        initial={{ opacity: 0, y: 40, scale: 0.92, rotateX: 18, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
        transition={{ duration: 1.1, ease: ease.silk, delay: 0.3 }}
        style={{ transformPerspective: 1000 }}
      >
        {/* inner light */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-lilac-500/30 blur-3xl" />

        <motion.div
          className="relative mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-lilac-500/90 to-blush-500/90 shadow-[0_10px_40px_-5px_rgba(240,79,155,0.6)]"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0, y: [0, -6, 0] }}
          transition={{
            scale: { delay: 0.8, type: "spring", stiffness: 220, damping: 14 },
            rotate: { delay: 0.8, type: "spring", stiffness: 220, damping: 14 },
            y: { delay: 1.6, duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Gift className="h-7 w-7 text-white" strokeWidth={1.8} />
          <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-blush-300" />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-blush-300" />
        </motion.div>

        <motion.h2
          dir="rtl"
          className="relative text-center font-arabic text-3xl font-medium leading-snug text-white sm:text-4xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: ease.silk }}
        >
          {question.title}
        </motion.h2>

        {/* reply message */}
        <div className="relative mt-3 grid h-9 place-items-center" dir="rtl" aria-live="polite">
          <AnimatePresence mode="wait">
            {reply && (
              <motion.p
                key={noCount > question.noReplies.length ? "last" : noCount}
                className="font-arabic text-lg text-blush-200"
                initial={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: ease.silk }}
              >
                {reply}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="relative mt-5 flex h-16 items-center gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.9, ease: ease.silk }}
        >
          <motion.button
            layout
            type="button"
            onClick={handleYes}
            className={cn(
              "group relative h-full min-w-0 overflow-hidden rounded-2xl bg-gradient-to-r from-lilac-500 via-[#c45bd8] to-blush-500 font-sans font-semibold tracking-[0.2em] text-white",
              "shadow-[0_10px_40px_-8px_rgba(240,79,155,0.7),inset_0_1px_0_rgba(255,255,255,0.35)]",
              stage.yesText,
            )}
            style={{ flexGrow: stage.yesGrow, flexBasis: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ layout: { type: "spring", stiffness: 160, damping: 20 } }}
          >
            {/* shine sweep */}
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-silk group-hover:translate-x-[400%]" />
            <motion.span layout="position" className="relative">
              {question.yes}
              {noCount >= 4 && " 💖"}
            </motion.span>
          </motion.button>

          <motion.button
            layout
            type="button"
            onClick={handleNo}
            className="relative h-full min-w-0 shrink-0 rounded-2xl border border-white/15 bg-white/5 font-sans text-base font-medium tracking-[0.2em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            style={{ flexGrow: noCount >= 5 ? 0 : 1, flexBasis: noCount >= 5 ? "auto" : 0 }}
            animate={{
              x: offset.x,
              y: offset.y,
              rotate: offset.r,
              scale: stage.noScale,
              paddingInline: noCount >= 5 ? 14 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 14,
              layout: { type: "spring", stiffness: 160, damping: 20 },
            }}
          >
            {question.no}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
