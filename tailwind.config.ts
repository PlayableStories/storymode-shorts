import type { Config } from "tailwindcss";

/*
 * Design tokens live in ONE place: the CSS variables in app/globals.css (:root).
 * This file just maps those variables to Tailwind names so you can write
 * `bg-paper`, `text-ink`, `text-accent`, `border-line`, etc.
 *
 * To restyle the whole site, edit the variables in globals.css — you should
 * not need to touch any component. Nothing about presentation lives in content.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        line: "var(--color-line)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
      },
      maxWidth: {
        reading: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
