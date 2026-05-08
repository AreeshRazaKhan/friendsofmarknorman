/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: 'var(--brand-navy)',
          2: 'var(--brand-navy-2)',
          3: 'var(--brand-navy-3)',
        },
        red: {
          DEFAULT: 'var(--brand-red)',
          2: 'var(--brand-red-2)',
          3: 'var(--brand-red-3)',
        },
        green: {
          DEFAULT: 'var(--brand-green)',
          2: 'var(--brand-green-2)',
        },
        paper: {
          DEFAULT: 'var(--brand-paper)',
          2: 'var(--brand-paper-2)',
          78: 'var(--brand-paper-78)',
        },
        bone: 'var(--brand-bone)',
        stone: {
          DEFAULT: 'var(--brand-stone)',
          dark: 'var(--brand-stone-dark)',
        },
        ink: 'var(--brand-ink-soft)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
      },
      fontFamily: {
        sans: ['var(--font-cabin)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.025em',
        tighter: '-0.02em',
        eyebrow: '0.28em',
      },
      borderRadius: {
        pill: '999px',
      },
      boxShadow: {
        stamp: '8px 8px 0 var(--brand-navy)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
