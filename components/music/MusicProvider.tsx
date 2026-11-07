"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { song } from "@/lib/content";
import { asset } from "@/lib/utils";

type MusicState = {
  playing: boolean;
  current: number;
  duration: number;
  volume: number;
  /** false when the audio file is missing / failed to load */
  available: boolean;
  /** Start playback with a gentle volume fade-in. Call from a click handler. */
  start: () => void;
  toggle: () => void;
  seek: (seconds: number) => void;
  setVolume: (v: number) => void;
};

const MusicContext = createContext<MusicState | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside <MusicProvider>");
  return ctx;
}

const TARGET_VOLUME = 0.6;

/** Gentle 3s fade from silence to the target volume. */
function fadeIn(audio: HTMLAudioElement, to = TARGET_VOLUME, ms = 3200) {
  audio.volume = 0;
  const t0 = performance.now();
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / ms);
    // stop if the user already moved the volume slider
    if (audio.dataset.userVolume) return;
    audio.volume = to * (1 - Math.pow(1 - p, 3));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(TARGET_VOLUME);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(asset(song.src));
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __audio?: HTMLAudioElement }).__audio = audio; // dev debugging
    }

    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      setAvailable(false);
      setPlaying(false);
      if (process.env.NODE_ENV !== "production") {
        console.info(`[music] No audio found at ${song.src} — add your song there.`);
      }
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    // ── Autoplay as soon as the site opens ─────────────────────────
    // Browsers block sound until the first user gesture, so we try
    // immediately and, if blocked, start on the very first tap / key.
    const unlockEvents = ["pointerdown", "touchstart", "keydown", "click"] as const;
    let started = false;
    const removeUnlock = () =>
      unlockEvents.forEach((ev) => window.removeEventListener(ev, tryStart, true));
    function tryStart() {
      if (started || !audio.paused) return;
      audio
        .play()
        .then(() => {
          started = true;
          removeUnlock();
          fadeIn(audio);
        })
        .catch(() => {
          /* blocked — wait for the first gesture */
        });
    }
    unlockEvents.forEach((ev) => window.addEventListener(ev, tryStart, { capture: true, passive: true }));
    tryStart();

    return () => {
      removeUnlock();
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    };
  }, []);

  const fadeTo = useCallback((to: number, ms: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      audio.volume = Math.max(0, Math.min(1, from + (to - from) * eased));
      if (p < 1) fadeRef.current = requestAnimationFrame(step);
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  const start = useCallback(() => {
    const audio = audioRef.current;
    // already playing from autoplay → don't restart or re-fade
    if (!audio || !audio.paused) return;
    audio.volume = 0;
    audio
      .play()
      .then(() => fadeTo(volume, 3200))
      .catch(() => setPlaying(false));
  }, [fadeTo, volume]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0;
      audio
        .play()
        .then(() => fadeTo(volume, 600))
        .catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [fadeTo, volume]);

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(seconds)) return;
    audio.currentTime = seconds;
    setCurrent(seconds);
  }, []);

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    const clamped = Math.max(0, Math.min(1, v));
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    if (audio) {
      audio.dataset.userVolume = "1";
      audio.volume = clamped;
    }
    setVolumeState(clamped);
  }, []);

  const value = useMemo(
    () => ({ playing, current, duration, volume, available, start, toggle, seek, setVolume }),
    [playing, current, duration, volume, available, start, toggle, seek, setVolume],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}
