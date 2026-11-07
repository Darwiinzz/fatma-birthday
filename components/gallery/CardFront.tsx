import { Star } from "@/components/ui/Sparkles";
import type { ReactNode } from "react";

/** The closed face of a card: glass, aurora light, a slowly turning halo. */
export function CardFront({
  index,
  total,
  icon,
  title,
  subtitle,
}: {
  index: number;
  total: number;
  icon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <div className="glass glow-border relative flex h-full w-full flex-col items-center justify-center rounded-[1.75rem] bg-ink-800/60">
      {/* aurora inside the card */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]">
        <div className="absolute -left-1/4 -top-1/4 h-3/4 w-3/4 rounded-full bg-lilac-500/35 blur-3xl transition-transform duration-1000 ease-silk group-hover:translate-x-6 group-hover:translate-y-6" />
        <div className="absolute -bottom-1/4 -right-1/4 h-3/4 w-3/4 rounded-full bg-blush-500/25 blur-3xl transition-transform duration-1000 ease-silk group-hover:-translate-x-6 group-hover:-translate-y-6" />
        {/* shine sweep on hover */}
        <div className="absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1200ms] ease-silk group-hover:translate-x-[450%]" />
      </div>

      <div dir="ltr" className="absolute left-5 top-5 font-display text-sm italic text-white/40">
        {String(index).padStart(2, "0")} <span className="text-white/20">/ {String(total).padStart(2, "0")}</span>
      </div>
      <Star size={14} className="absolute right-5 top-5 animate-twinkle text-blush-200" />

      {/* halo + icon */}
      <div className="relative mb-7 grid h-28 w-28 place-items-center [transform:translateZ(40px)]">
        <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(255,122,184,0.7),transparent_40%,rgba(169,125,255,0.7),transparent_75%)] opacity-60 blur-md transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-2 rounded-full bg-ink-900/80 ring-1 ring-white/10" />
        <div className="relative text-4xl transition-transform duration-700 ease-silk group-hover:scale-110 group-hover:rotate-6">
          {icon ?? <Star size={36} className="text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.9)]" />}
        </div>
      </div>

      <div className="relative px-6 text-center [transform:translateZ(30px)]">
        <p className="text-sm font-medium tracking-[0.18em] text-white/90">{title}</p>
        {subtitle && <p className="mt-2 text-xs text-white/40">{subtitle}</p>}
      </div>
    </div>
  );
}
