import type { Config } from "tailwindcss";
import tailwindPresetMantine from "tailwind-preset-mantine";
import { breakpoints, colors } from "./app/theme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    plugins: [],
  },
  presets: [
    tailwindPresetMantine({
      mantineBreakpoints: breakpoints,
      mantineColors: colors,
    }),
  ],
} satisfies Config;
