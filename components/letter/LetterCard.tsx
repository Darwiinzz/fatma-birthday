"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FlipCard } from "@/components/gallery/FlipCard";
import { CardFront } from "@/components/gallery/CardFront";

type Props = {
  index: number;
  total: number;
  onOpen: () => void;
};

/** The last card: an envelope that flips into folded paper, then opens the letter. */
export function LetterCard({ index, total, onOpen }: Props) {
  const [flipped, setFlipped] = useState(false);

  const handle = () => {
    if (!flipped) {
      setFlipped(true);
      setTimeout(onOpen, 1100);
    } else {
      onOpen();
    }
  };

  return (
    <FlipCard
      flipped={flipped}
      onClick={handle}
      label={flipped ? "Read the letter" : "Open the last surprise"}
      className="aspect-[3/4] w-full max-w-[22rem]"
      front={
        <CardFront
          index={index}
          total={total}
          icon={
            <motion.span
              className="block text-5xl drop-shadow-[0_0_20px_rgba(255,122,184,0.8)]"
              animate={{ y: [0, -6, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              💌
            </motion.span>
          }
          title={
            <span dir="rtl" className="font-arabic text-xl font-medium tracking-normal">
              آخر مفاجأة
            </span>
          }
          subtitle="the last surprise"
        />
      }
      back={
        <div className="paper relative flex h-full w-full flex-col items-center justify-center rounded-[1.75rem] p-8">
          {/* fold lines */}
          <div className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-2/3 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          {/* wax seal */}
          <div className="relative grid h-20 w-20 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ff9cc8,#d1407f_55%,#8e2457)] shadow-[0_8px_20px_rgba(142,36,87,0.45),inset_0_-4px_10px_rgba(0,0,0,0.25),inset_0_3px_6px_rgba(255,255,255,0.35)]">
            <span className="font-display text-3xl italic text-white/90 drop-shadow">F</span>
          </div>
          <p dir="rtl" className="mt-6 font-hand text-2xl text-paper-ink">
            ليكي انتي
          </p>
          <p className="mt-2 text-xs tracking-[0.2em] text-paper-ink/50">tap to read</p>
        </div>
      }
    />
  );
}
