/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Background — pure black
        bg: {
          canvas: '#000000',
          primary: '#050505',
          secondary: '#0a0a0a',
          tertiary: '#111111',
          elevated: '#1a1a1a',
        },
        // Borders — green subtle, yellow emphasis
        border: {
          subtle: 'rgba(74, 222, 128, 0.1)',
          default: 'rgba(74, 222, 128, 0.2)',
          strong: 'rgba(74, 222, 128, 0.35)',
          yellow: 'rgba(251, 191, 36, 0.4)',
          'yellow-strong': 'rgba(251, 191, 36, 0.6)',
        },
        // Text — GREEN IS THE TEXT COLOR
        text: {
          primary: '#4ade80',
          secondary: '#2d8a5e',
          tertiary: '#1d5c3d',
          quaternary: '#14402a',
          // Yellow for emphasis only
          yellow: '#fbbf24',
          'yellow-dim': '#a17c14',
          // White for rare highlights
          white: '#e8e8e8',
        },
        // Accents
        accent: {
          green: '#4ade80',
          'green-dim': '#22c55e',
          'green-subtle': 'rgba(74, 222, 128, 0.08)',
          'green-border': 'rgba(74, 222, 128, 0.3)',
          'green-glow': 'rgba(74, 222, 128, 0.2)',
          yellow: '#fbbf24',
          'yellow-subtle': 'rgba(251, 191, 36, 0.08)',
          'yellow-border': 'rgba(251, 191, 36, 0.35)',
          'yellow-glow': 'rgba(251, 191, 36, 0.25)',
        },
      },
      fontSize: {
        'display-xl': ['3.5rem', { lineHeight: '1.05', fontWeight: '600' }],
        'display-lg': ['2.5rem', { lineHeight: '1.1', fontWeight: '600' }],
        'heading-xl': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-md': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.35', fontWeight: '500' }],
        'body-lg': ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
        'body-md': ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label-lg': ['0.8125rem', { lineHeight: '1.4', fontWeight: '500' }],
        'label-md': ['0.75rem', { lineHeight: '1.35', fontWeight: '500' }],
        'label-sm': ['0.6875rem', { lineHeight: '1.3', fontWeight: '400' }],
        'tech-lg': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'tech-md': ['0.8125rem', { lineHeight: '1.4', fontWeight: '400' }],
        'tech-sm': ['0.75rem', { lineHeight: '1.35', fontWeight: '400' }],
        'tech-xs': ['0.6875rem', { lineHeight: '1.3', fontWeight: '400' }],
      },
      spacing: {
        '0.5': '2px',
        '1.5': '6px',
        '2.5': '10px',
        '3.5': '14px',
        '4.5': '18px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'node': '0 2px 8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'node-hover': '0 4px 16px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glow-green': '0 0 20px rgba(74, 222, 128, 0.2), 0 0 8px rgba(74, 222, 128, 0.12)',
        'glow-yellow': '0 0 20px rgba(251, 191, 36, 0.2), 0 0 8px rgba(251, 191, 36, 0.12)',
        'glow-subtle': '0 0 12px rgba(74, 222, 128, 0.08), 0 0 4px rgba(74, 222, 128, 0.04)',
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { opacity: '0.5' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDuration: {
        'instant': '0ms',
        'fast': '120ms',
        'normal': '200ms',
        'slow': '350ms',
        'slower': '500ms',
        'cinematic': '800ms',
      },
      transitionTimingFunction: {
        'out-quick': 'cubic-bezier(0, 0, 0.2, 1)',
        'out-smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      letterSpacing: {
        'tight': '-0.025em',
        'wide': '0.025em',
        'wider': '0.05em',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
    },
  },
  plugins: [],
}
