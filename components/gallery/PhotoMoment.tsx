"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FlipCard } from "./FlipCard";
import { CardFront } from "./CardFront";
import type { Photo } from "@/lib/content";
import { burst } from "@/lib/celebrate";
import { asset, ease } from "@/lib/utils";

type Props = {
  photo: Photo;
  index: number;
  total: number;
};

/** One photo: a closed 3D card that flips to reveal the picture, then the caption writes itself underneath. */
export function PhotoMoment({ photo, index, total }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [opened, setOpened] = useState(false);

  const toggle = (e?: React.MouseEvent) => {
    if (!opened && e) {
      burst({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    }
    setFlipped((f) => !f);
    setOpened(true);
  };

  return (
    <div className="flex flex-col items-center">
      <FlipCard
        flipped={flipped}
        onClick={toggle}
        label={flipped ? "Close photo" : `Open photo ${index}`}
        className="aspect-[3/4] w-full max-w-[22rem]"
        front={<CardFront index={index} total={total} title="✨ Click To Open ✨" subtitle="tap to reveal" />}
        back={
          <div className="relative h-full w-full bg-ink-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(photo.src)}
              alt={photo.alt}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover"
              style={{ objectPosition: photo.focus ?? "50% 30%" }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/15" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/60 to-transparent" />
          </div>
        }
      />

      {/* caption */}
      <div className="mt-7 min-h-[9.5rem] w-full max-w-[22rem]" dir="rtl">
        <AnimatePresence>
          {flipped && (
            <motion.div
              key="caption"
              className="text-center font-arabic"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                show: { transition: { staggerChildren: 0.32, delayChildren: 0.45 } },
              }}
            >
              {photo.caption.map((line, i) => (
                <motion.p
                  key={i}
                  className={
                    i === 0
                      ? "text-xl font-medium leading-loose text-white"
                      : "text-lg font-light leading-loose text-white/75"
                  }
                  variants={{
                    hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: ease.silk } },
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
