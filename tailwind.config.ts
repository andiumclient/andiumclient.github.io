import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: 'hsl(var(--bg) / <alpha-value>)',
          elevated: 'hsl(var(--bg-elevated) / <alpha-value>)'
        },
        fg: {
          DEFAULT: 'hsl(var(--fg) / <alpha-value>)',
          muted: 'hsl(var(--fg-muted) / <alpha-value>)'
        },
        accent: {
          blue: 'hsl(var(--accent-blue) / <alpha-value>)',
          purple: 'hsl(var(--accent-purple) / <alpha-value>)',
          glow: 'hsl(var(--accent-glow) / <alpha-value>)'
        },
        border: 'hsl(var(--border) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh':
          'radial-gradient(at 20% 20%, hsl(195 100% 50% / 0.18) 0px, transparent 40%), radial-gradient(at 80% 30%, hsl(258 90% 66% / 0.18) 0px, transparent 45%), radial-gradient(at 50% 80%, hsl(195 100% 50% / 0.12) 0px, transparent 50%)'
      },
      keyframes: {
        'gradient-shift': {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(180deg)' }
        }
      },
      animation: {
        'gradient-shift': 'gradient-shift 18s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3.5s ease-in-out infinite',
        'float-slow': 'float-slow 16s ease-in-out infinite'
      },
      boxShadow: {
        glow: '0 0 32px hsl(var(--accent-blue) / 0.45)',
        'glow-lg': '0 0 60px hsl(var(--accent-blue) / 0.55)',
        'glow-purple': '0 0 32px hsl(var(--accent-purple) / 0.45)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
