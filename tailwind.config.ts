import type { Config } from "tailwindcss";

/* Palette et typo entièrement redéfinies — aucune couleur Tailwind par défaut.
   Voir docs/specs/refonte-motion-craft.md §2.2 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    /* `colors` remplace la palette par défaut au lieu de l'étendre :
       `text-slate-400` et consorts cessent d'exister. */
    colors: {
      transparent: "transparent",
      current: "currentColor",
      bg: "var(--bg)",
      raise: "var(--bg-raise)",
      ink: "var(--fg)",
      muted: "var(--fg-muted)",
      faint: "var(--fg-faint)",
      line: "var(--line)",
      "line-strong": "var(--line-strong)",
      surface: "var(--surface)",
      "surface-raise": "var(--surface-raise)",
      accent: "var(--accent)",
      "accent-soft": "var(--accent-soft)",
      "accent-line": "var(--accent-line)",
      "on-accent": "var(--on-accent)",
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-text)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
      },
      spacing: {
        /* Échelle unique 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 */
        section: "6rem",
        "section-lg": "9rem",
      },
      borderRadius: {
        /* Coins quasi nets : l'arrondi généralisé est un marqueur de template */
        DEFAULT: "2px",
        sm: "2px",
        md: "3px",
        lg: "4px",
        xl: "4px",
        "2xl": "6px",
        full: "9999px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
