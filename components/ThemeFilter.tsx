"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";

export type Filter = "all" | Theme;

/**
 * Keyboard-operable theme filter, built as a radiogroup of real buttons:
 * - Tab moves into the group and lands on the selected option.
 * - Left/Right (and Up/Down) arrows move between options and select them.
 * - Enter/Space select the focused option.
 * - Visible focus ring throughout.
 */
export function ThemeFilter({
  themes,
  active,
  onChange,
}: {
  themes: Theme[];
  active: Filter;
  onChange: (value: Filter) => void;
}) {
  const options: Filter[] = ["all", ...themes];
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  function focusOption(index: number) {
    const clamped = (index + options.length) % options.length;
    onChange(options[clamped]);
    buttonsRef.current[clamped]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusOption(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusOption(index - 1);
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Filter by theme"
      className="flex flex-wrap gap-2"
    >
      {options.map((option, index) => {
        const selected = option === active;
        return (
          <button
            key={option}
            ref={(el) => {
              buttonsRef.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`rounded-full border px-3 py-1 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              selected
                ? "border-accent bg-accent text-paper"
                : "border-line text-muted hover:text-ink"
            }`}
          >
            {option === "all" ? "All" : option}
          </button>
        );
      })}
    </div>
  );
}
