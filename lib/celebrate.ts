import confetti from "canvas-confetti";

const palette = ["#ff7ab8", "#ffd1e8", "#c9a8ff", "#a97dff", "#ffffff", "#ffe08a"];

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Two soft cannons from the bottom corners. */
export function sideCannons(duration = 1600) {
  if (reduced()) return;
  const end = Date.now() + duration;
  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      startVelocity: 55,
      origin: { x: 0, y: 0.85 },
      colors: palette,
      scalar: 0.9,
      zIndex: 60,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      startVelocity: 55,
      origin: { x: 1, y: 0.85 },
      colors: palette,
      scalar: 0.9,
      zIndex: 60,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/** A centred burst with stars mixed in. */
export function burst(origin = { x: 0.5, y: 0.45 }) {
  if (reduced()) return;
  const base = { origin, colors: palette, zIndex: 60, disableForReducedMotion: true };
  confetti({ ...base, particleCount: 70, spread: 80, startVelocity: 38, scalar: 0.9 });
  confetti({
    ...base,
    particleCount: 26,
    spread: 120,
    startVelocity: 30,
    shapes: ["star"],
    scalar: 1.2,
  });
}

/** Slow, sparse confetti falling from the top — for the finale. */
export function snowfall(duration = 6000) {
  if (reduced()) return () => {};
  let stopped = false;
  const end = Date.now() + duration;
  (function frame() {
    if (stopped) return;
    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: 380,
      gravity: 0.45,
      origin: { x: Math.random(), y: -0.05 },
      colors: palette,
      shapes: Math.random() > 0.7 ? ["star"] : ["circle", "square"],
      scalar: 0.7 + Math.random() * 0.6,
      drift: Math.random() - 0.5,
      zIndex: 60,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  return () => {
    stopped = true;
  };
}
