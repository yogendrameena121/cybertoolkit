import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary background palette
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Cyber-specific colors
        cyber: {
          green: "#00ff88",
          cyan: "#00d4ff",
          blue: "#0066ff",
          purple: "#8b5cf6",
          red: "#ff4444",
          orange: "#ff8800",
          yellow: "#ffd700",
          navy: "#050d1a",
          slate: "#0a1628",
          panel: "#0d1f35",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "Courier New", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)",
        "cyber-gradient":
          "linear-gradient(135deg, #050d1a 0%, #0a1628 50%, #0d1f35 100%)",
        "glow-green":
          "radial-gradient(ellipse at center, rgba(0, 255, 136, 0.15) 0%, transparent 70%)",
        "glow-cyan":
          "radial-gradient(ellipse at center, rgba(0, 212, 255, 0.15) 0%, transparent 70%)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
      boxShadow: {
        "cyber-green": "0 0 20px rgba(0, 255, 136, 0.3)",
        "cyber-cyan": "0 0 20px rgba(0, 212, 255, 0.3)",
        "cyber-sm": "0 0 10px rgba(0, 255, 136, 0.15)",
        panel: "0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "pulse-green": "pulseGreen 2s ease-in-out infinite",
        "scan-line": "scanLine 3s linear infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        pulseGreen: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0, 255, 136, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 255, 136, 0.6)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
