import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Outfit, sans-serif",

  headings: {
    fontFamily: "Outfit, sans-serif",
    sizes: {
      h1: { fontSize: "3.75rem", lineHeight: "3.75rem" }, // hero-1
      h2: { fontSize: "3.125rem", lineHeight: "3.438rem" }, // hero-2
      h3: { fontSize: "2rem", lineHeight: "2.6rem" }, // heading-3
      h4: { fontSize: "1.25rem", lineHeight: "1.575rem" }, // heading-4
    },
  },
  colors: {
    primary: [
      "#FFFFFF",
      "#F5F5F5",
      "#E5E5E5",
      "#D4D4D4",
      "#A3A3A3",
      "#737373",
      "#404040",
      "#262626",
      "#171717",
      "#000000",
    ],
    gray: [
      "#FFFFFF",
      "#F9FAFB",
      "#F3F4F6",
      "#E5E7EB",
      "#D1D5DB",
      "#9CA3AF",
      "#6B7280",
      "#4B5563",
      "#374151",
      "#1F2937",
    ],
    yellow: [
      "#FEF9C3",
      "#FEF08A",
      "#FDE047",
      "#FACC15",
      "#EAB308",
      "#CA8A04",
      "#A16207",
      "#854D0E",
      "#713F12",
      "#422006",
    ],
    "yellow-light": [
      "#FFFEEE", // Existing lightest shade
      "#FFFDE5",
      "#FFFBCC",
      "#FFF9B3",
      "#FFFEEE",
      "#FFF380",
      "#FFF066",
      "#FFEC4D",
      "#FFE833",
      "#FFE41A",
    ],
    destructive: [
      "#FEE2E2",
      "#FECACA",
      "#FCA5A5",
      "#F87171",
      "#EF4444",
      "#DC2626",
      "#B91C1C",
      "#991B1B",
      "#7F1D1D",
      "#450A0A",
    ],
    success: [
      "#DCFCE7",
      "#BBF7D0",
      "#86EFAC",
      "#4ADE80",
      "#22C55E",
      "#16A34A",
      "#15803D",
      "#166534",
      "#14532D",
      "#052E16",
    ],
  },
  radius: {
    xs: "calc(0.625rem - 6px)", // --radius-sm
    sm: "calc(0.625rem - 4px)", // --radius-md
    md: "0.625rem", // --radius-lg
    lg: "calc(0.625rem + 4px)", // --radius-xl
  },
  other: {
    ctaGradient: {
      from: "var(--cta-top)",
      to: "var(--cta-bottom)",
    },
  },
});
