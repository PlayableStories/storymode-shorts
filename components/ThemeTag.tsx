import type { Theme } from "@/lib/themes";

/** A small, soft, consistent theme label. Presentation only. */
export function ThemeTag({ theme }: { theme: Theme }) {
  return (
    <span className="inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
      {theme}
    </span>
  );
}
