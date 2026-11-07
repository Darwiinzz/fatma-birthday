"use client";

import { motion } from "framer-motion";
import { PhotoMoment } from "./PhotoMoment";
import { LetterCard } from "@/components/letter/LetterCard";
import { Reveal } from "@/components/ui/Reveal";
import { photos } from "@/lib/content";
import { ease } from "@/lib/utils";

function SectionTitle({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-14 flex flex-col items-center text-center sm:mb-20">
      <Reveal>
        <div dir="ltr" className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.4em] text-lilac-300/80">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-lilac-300/60" />
          {eyebrow}
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-lilac-300/60" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 dir="rtl" className="font-arabic text-4xl font-medium text-white sm:text-6xl">
          {title}
        </h2>
      </Reveal>
      {note && (
        <Reveal delay={0.2}>
          <p dir="rtl" className="mt-4 font-arabic text-base font-light text-white/50">
            {note}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Moments({ onOpenLetter }: { onOpenLetter: () => void }) {
  const total = photos.length + 1;

  return (
    <>
      <section className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <SectionTitle eyebrow="Chapter 01 · Moments" title="لحظات صغيرة" note="كل كارت فيه حاجة… افتحيهم واحد واحد ✨" />

        <div className="grid grid-cols-1 justify-items-center gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              className={`w-full ${i % 3 === 1 ? "lg:mt-20" : ""}`}
              initial={{ opacity: 0, y: 80, rotateX: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.2, delay: (i % 3) * 0.15, ease: ease.silk }}
              style={{ transformPerspective: 1200 }}
            >
              <PhotoMoment photo={photo} index={i + 1} total={total} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 pb-40 pt-10">
        <SectionTitle eyebrow="Chapter 02 · One more thing" title="وأخيرًا…" />
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 80, scale: 0.92, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.3, ease: ease.silk }}
        >
          <div className="w-full max-w-[22rem]">
            <LetterCard index={total} total={total} onOpen={onOpenLetter} />
          </div>
        </motion.div>
      </section>

      <footer className="relative pb-28 text-center" dir="ltr">
        <p className="font-display text-lg italic text-white/30">made by hand, for Fatma ✦</p>
      </footer>
    </>
  );
}
