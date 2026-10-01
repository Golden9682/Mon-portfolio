import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * Les échelles typographiques maison (globals.css) s'écrivent `text-*`.
 * Sans cette déclaration, tailwind-merge les prend pour des couleurs et
 * supprime `text-label` dès qu'un `text-ink` ou `text-muted` le suit.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["label", "display", "title", "accent-word"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
