"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { TypingIntro } from "@/components/intro/TypingIntro";
import { ReadyQuestion } from "@/components/question/ReadyQuestion";
import { MusicProvider, useMusic } from "@/components/music/MusicProvider";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { Ambient } from "@/components/background/Ambient";
import { Bloom } from "@/components/ui/Bloom";
import { Hero } from "@/components/hero/Hero";
import { Moments } from "@/components/gallery/Moments";
import { LetterOverlay } from "@/components/letter/LetterOverlay";
import { Finale } from "@/components/finale/Finale";
import { introLines } from "@/lib/content";
import { ease } from "@/lib/utils";

type Stage = "intro" | "question" | "gift";

function Experience() {
  const music = useMusic();
  const [stage, setStage] = useState<Stage>("intro");
  const [bloom, setBloom] = useState<{ x: number; y: number } | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [finaleOn, setFinaleOn] = useState(false);

  const endIntro = useCallback(() => setStage((s) => (s === "intro" ? "question" : s)), []);

  const handleYes = (origin: { x: number; y: number }) => {
    music.start(); // inside the click — browsers allow audio here
    setBloom(origin);
  };

  const closeLetter = useCallback(() => {
    setLetterOpen(false);
    setTimeout(() => setFinaleOn(true), 900);
  }, []);

  return (
    <main className="relative min-h-dvh">
      {stage !== "intro" && <Ambient />}

      <AnimatePresence>
        {stage === "intro" && <TypingIntro key="intro" lines={introLines} onDone={endIntro} />}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "question" && <ReadyQuestion key="question" onYes={handleYes} />}
      </AnimatePresence>

      {bloom && (
        <Bloom
          origin={bloom}
          onCovered={() => {
            window.scrollTo(0, 0);
            setStage("gift");
          }}
        />
      )}

      {stage === "gift" && (
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: ease.silk }}
        >
          <Hero />
          <Moments onOpenLetter={() => setLetterOpen(true)} />
        </motion.div>
      )}

      <AnimatePresence>{letterOpen && <LetterOverlay key="letter" onClose={closeLetter} />}</AnimatePresence>

      <AnimatePresence>
        {finaleOn && <Finale key="finale" onReplay={() => setFinaleOn(false)} />}
      </AnimatePresence>

      {stage === "gift" && <MusicPlayer />}
    </main>
  );
}

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <MusicProvider>
        <Experience />
      </MusicProvider>
    </MotionConfig>
  );
}
