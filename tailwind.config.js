/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
        mono: ["IBM Plex Mono", "JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        bg: {
          canvas: "rgb(var(--bg-canvas) / <alpha-value>)",
          surface: "rgb(var(--bg-surface) / <alpha-value>)",
          panel: "rgb(var(--bg-panel) / <alpha-value>)",
          muted: "rgb(var(--bg-muted) / <alpha-value>)",
        },
        border: {
          subtle: "rgb(var(--border-subtle) / 0.28)",
          default: "rgb(var(--border-default) / 0.6)",
          emphasis: "rgb(var(--border-emphasis) / 0.75)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--text-tertiary) / <alpha-value>)",
          inverse: "rgb(var(--text-inverse) / <alpha-value>)",
        },
        accent: {
          teal: "rgb(var(--accent-teal) / <alpha-value>)",
          blue: "rgb(var(--accent-blue) / <alpha-value>)",
          copper: "rgb(var(--accent-copper) / <alpha-value>)",
          mint: "rgb(var(--accent-mint) / <alpha-value>)",
        },
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.05", fontWeight: "600" }],
        "display-lg": ["2.5rem", { lineHeight: "1.1", fontWeight: "600" }],
        "heading-xl": ["1.75rem", { lineHeight: "1.2", fontWeight: "600" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.25", fontWeight: "600" }],
        "heading-md": ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.35", fontWeight: "500" }],
        "body-lg": ["1rem", { lineHeight: "1.65", fontWeight: "400" }],
        "body-md": ["0.9375rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "label-lg": ["0.8125rem", { lineHeight: "1.4", fontWeight: "500" }],
        "label-md": ["0.75rem", { lineHeight: "1.35", fontWeight: "500" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.3", fontWeight: "400" }],
        "tech-lg": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "tech-md": ["0.8125rem", { lineHeight: "1.4", fontWeight: "400" }],
        "tech-sm": ["0.75rem", { lineHeight: "1.35", fontWeight: "400" }],
        "tech-xs": ["0.6875rem", { lineHeight: "1.3", fontWeight: "400" }],
      },
      spacing: {
        "0.5": "2px",
        "1.5": "6px",
        "2.5": "10px",
        "3.5": "14px",
        "4.5": "18px",
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        panel: "0 16px 40px rgba(4, 9, 16, 0.28)",
        float: "0 28px 72px rgba(4, 9, 16, 0.4)",
        focus: "0 0 0 4px rgba(117, 147, 255, 0.14)",
      },
      animation: {
        shimmer: "shimmer 2s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.5" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionDuration: {
        instant: "0ms",
        fast: "120ms",
        normal: "200ms",
        slow: "350ms",
        slower: "500ms",
        cinematic: "800ms",
      },
      transitionTimingFunction: {
        "out-quick": "cubic-bezier(0, 0, 0.2, 1)",
        "out-smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      letterSpacing: {
        tight: "-0.025em",
        wide: "0.025em",
        wider: "0.05em",
      },
    },
  },
  plugins: [],
};
