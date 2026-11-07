"use client";

import { useMemo } from "react";

function Star({ size, className, style }: { size: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden
    >
      <path
        d="M12 0c.6 5.6 2.9 9.3 12 12-9.1 2.7-11.4 6.4-12 12-.6-5.6-2.9-9.3-12-12C9.1 9.3 11.4 5.6 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Twinkling four-point stars scattered across a container. */
export function Sparkles({ count = 18, seed = 1 }: { count?: number; seed?: number }) {
  const stars = useMemo(() => {
    // deterministic pseudo-random so server & client markup match
    let s = seed * 9301 + 49297;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: count }, () => ({
      top: rand() * 100,
      left: rand() * 100,
      size: 6 + rand() * 14,
      delay: rand() * 4,
      duration: 2.4 + rand() * 2.6,
      pink: rand() > 0.5,
    }));
  }, [count, seed]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {stars.map((st, i) => (
        <Star
          key={i}
          size={st.size}
          className={`absolute animate-twinkle ${st.pink ? "text-blush-200" : "text-lilac-200"} drop-shadow-[0_0_8px_rgba(255,209,232,0.9)]`}
          style={{
            top: `${st.top}%`,
            left: `${st.left}%`,
            animationDelay: `${st.delay}s`,
            animationDuration: `${st.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export { Star };
