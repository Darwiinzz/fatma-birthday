"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { letter } from "@/lib/content";
import { ease } from "@/lib/utils";

/**
 * The handwritten letter. Paper rises out of the dark and every line
 * "writes" itself from right to left, like ink following a pen.
 */
export function LetterOverlay({ onClose }: { onClose: () => void }) {
  // timing: each written line takes a beat; blank lines are short breaths
  const delays = useMemo(() => {
    let t = 1.1;
    return letter.map((line) => {
      const d = t;
      t += line === "" ? 0.25 : Math.min(0.95, 0.35 + line.length * 0.012);
      return d;
    });
  }, []);
  const endAt = delays[delays.length - 1] + 1;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[55] overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-label="A letter for Fatma"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: ease.inOut } }}
      transition={{ duration: 0.7 }}
    >
      <div className="fixed inset-0 bg-ink-950/80 backdrop-blur-xl" onClick={onClose} />

      <button
        type="button"
        onClick={onClose}
        className="glass fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full text-white/70 transition hover:text-white sm:right-6 sm:top-6"
        aria-label="Close letter"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative flex min-h-full items-start justify-center px-4 py-16 sm:py-24 [perspective:1600px]">
        <motion.article
          dir="rtl"
          className="paper relative w-full max-w-2xl rounded-[6px] px-7 pb-14 pt-16 sm:px-14 sm:pb-20 sm:pt-20"
          initial={{ opacity: 0, y: 120, rotateX: 25, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.96, filter: "blur(6px)" }}
          transition={{ duration: 1.3, ease: ease.silk }}
          style={{ transformOrigin: "50% 0%" }}
        >
          {/* washi tape */}
          <div className="absolute -top-3 left-1/2 h-8 w-32 -translate-x-1/2 -rotate-2 bg-gradient-to-r from-blush-200/80 to-lilac-200/80 shadow-sm [mask-image:linear-gradient(90deg,transparent_0,#000_6px,#000_calc(100%-6px),transparent)]" />
          {/* margin line */}
          <div className="pointer-events-none absolute inset-y-0 right-5 z-10 w-px bg-blush-400/40 sm:right-10" />
          {/* corner doodles */}
          <span className="pointer-events-none absolute left-6 top-6 text-lg text-blush-400/70">✦</span>
          <span className="pointer-events-none absolute bottom-6 right-8 text-sm text-lilac-500/60">✧</span>

          <div className="ruled relative -mx-7 px-7 font-hand text-[1.55rem] text-paper-ink sm:-mx-14 sm:px-14 sm:text-[1.85rem]">
            {letter.map((line, i) =>
              line === "" ? (
                <div key={i} className="h-[var(--rule)]" aria-hidden />
              ) : (
                <motion.p
                  key={i}
                  className={
                    i === letter.length - 1
                      ? "text-center text-3xl"
                      : line.startsWith("يا أجمل") || line.startsWith("عيد ميلاد")
                        ? "font-bold text-[#7a2a5c]"
                        : undefined
                  }
                  initial={{ clipPath: "inset(-20% 0 -20% 100%)", opacity: 0.2 }}
                  animate={{ clipPath: "inset(-20% 0 -20% 0%)", opacity: 1 }}
                  transition={{
                    delay: delays[i],
                    duration: Math.min(1.6, 0.5 + line.length * 0.022),
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {line}
                </motion.p>
              ),
            )}
          </div>

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(endAt, 8), duration: 0.8, ease: ease.silk }}
          >
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-paper-ink px-7 py-3 font-arabic text-sm text-paper-50 shadow-[0_10px_30px_-10px_rgba(43,33,64,0.8)]"
            >
              اقفلي الرسالة ✨
            </motion.button>
          </motion.div>
        </motion.article>
      </div>
    </motion.div>
  );
}
