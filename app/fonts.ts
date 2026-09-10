import localFont from "next/font/local";

/**
 * Vazirmatn (variable) — self-hosted for zero layout shift and no external CDN.
 * Files are copied from `@fontsource-variable/vazirmatn` into `app/fonts/`.
 */
export const vazirmatn = localFont({
  src: [
    {
      path: "./fonts/vazirmatn-arabic.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/vazirmatn-latin.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-vazir",
  fallback: ["system-ui", "Segoe UI", "Tahoma", "sans-serif"],
  preload: true,
});
