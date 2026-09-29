import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "accent" | "muted" | "outline";

interface PillProps {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

const TONES: Record<Tone, string> = {
  accent: "bg-accent text-white",
  muted: "bg-line text-ink",
  outline: "border border-line text-muted",
};

export function Pill({ tone = "outline", className, children }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold leading-5",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
