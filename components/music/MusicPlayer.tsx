"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Music2, Pause, Play, Volume1, Volume2, VolumeX, X } from "lucide-react";
import { useState } from "react";
import { useMusic } from "./MusicProvider";
import { song } from "@/lib/content";
import { cn, ease, formatTime } from "@/lib/utils";

function Equalizer({ active, bars = 4 }: { active: boolean; bars?: number }) {
  const heights = [0.55, 1, 0.7, 0.9, 0.45];
  return (
    <div className="flex h-4 items-end gap-[3px]" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-lilac-400 to-blush-300"
          initial={{ scaleY: 0.25 }}
          animate={
            active
              ? { scaleY: [0.25, heights[i % heights.length], 0.35, heights[(i + 2) % heights.length], 0.25] }
              : { scaleY: 0.25 }
          }
          transition={
            active
              ? { duration: 1.1 + i * 0.17, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.4 }
          }
          style={{ height: "100%", originY: 1 }}
        />
      ))}
    </div>
  );
}

export function MusicPlayer() {
  const { playing, current, duration, volume, available, toggle, seek, setVolume } = useMusic();
  const [open, setOpen] = useState(false);
  const progress = duration > 0 ? current / duration : 0;
  const VolIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <motion.div
      dir="ltr"
      className="fixed bottom-4 right-4 z-[59] sm:bottom-6 sm:right-6"
      initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.1, delay: 1.2, ease: ease.silk }}
    >
      {/* ambient glow behind the player */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-r from-lilac-500/30 to-blush-500/30 blur-2xl"
        animate={{ opacity: playing ? [0.5, 0.9, 0.5] : 0.25 }}
        transition={{ duration: 3.5, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
      />

      <motion.div
        layout
        transition={{ layout: { duration: 0.55, ease: ease.silk } }}
        className={cn(
          "glass glow-border relative overflow-hidden",
          open ? "w-[min(20rem,calc(100vw-2rem))] rounded-[1.75rem] p-4" : "rounded-full p-1.5",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!open ? (
            <motion.button
              key="pill"
              type="button"
              onClick={() => setOpen(true)}
              className="flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-label="Open music player"
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-lilac-500 to-blush-500 shadow-[0_0_24px_rgba(240,79,155,0.55)]">
                <motion.span
                  animate={{ rotate: playing ? 360 : 0 }}
                  transition={playing ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0.6 }}
                >
                  <Music2 className="h-4 w-4 text-white" strokeWidth={2.2} />
                </motion.span>
              </span>
              <Equalizer active={playing} />
              <span className="hidden max-w-[9rem] truncate text-xs font-medium tracking-wide text-white/80 sm:block">
                {playing ? "Now playing" : available ? "Paused" : "Music"}
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: ease.silk, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                {/* Vinyl */}
                <div className="relative h-14 w-14 shrink-0">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "repeating-radial-gradient(circle at 50% 50%, #17101f 0 2px, #22182e 2px 3px)",
                      boxShadow: "0 0 30px rgba(169,125,255,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)",
                    }}
                    animate={{ rotate: playing ? 360 : 0 }}
                    transition={playing ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0.8 }}
                  >
                    <div className="absolute inset-[34%] rounded-full bg-gradient-to-br from-blush-400 to-lilac-500" />
                    <div className="absolute inset-[46%] rounded-full bg-ink-950" />
                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.12)_40deg,transparent_80deg,transparent_180deg,rgba(255,255,255,0.08)_220deg,transparent_260deg)]" />
                  </motion.div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{song.title}</p>
                  <p className="truncate text-xs text-white/50">
                    {available ? song.artist : "Add /public/music/song.mp3"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
                  aria-label="Minimise player"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Progress */}
              <div className="flex flex-col gap-1.5">
                <div className="group relative h-1.5 w-full rounded-full bg-white/10">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-lilac-400 to-blush-400 shadow-[0_0_14px_rgba(255,122,184,0.7)]"
                    style={{ width: `${progress * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-opacity group-hover:opacity-100"
                    style={{ left: `${progress * 100}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={duration || 1}
                    step={0.1}
                    value={current}
                    onChange={(e) => seek(Number(e.target.value))}
                    disabled={!available}
                    aria-label="Seek"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] tabular-nums text-white/40">
                  <span>{formatTime(current)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.06 }}
                  onClick={toggle}
                  disabled={!available}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink-950 shadow-[0_0_30px_rgba(255,255,255,0.35)] disabled:opacity-40"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={playing ? "pause" : "play"}
                      initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.4, opacity: 0, rotate: 30 }}
                      transition={{ duration: 0.2 }}
                    >
                      {playing ? (
                        <Pause className="h-5 w-5" fill="currentColor" />
                      ) : (
                        <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>

                <Equalizer active={playing} bars={5} />

                <div className="ml-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setVolume(volume === 0 ? 0.6 : 0)}
                    className="text-white/60 transition hover:text-white"
                    aria-label={volume === 0 ? "Unmute" : "Mute"}
                  >
                    <VolIcon className="h-4 w-4" />
                  </button>
                  <div className="relative h-1 w-20 rounded-full bg-white/10">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-white/80"
                      style={{ width: `${volume * 100}%` }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      aria-label="Volume"
                      className="absolute -inset-y-2 inset-x-0 h-[calc(100%+1rem)] w-full cursor-pointer opacity-0"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
