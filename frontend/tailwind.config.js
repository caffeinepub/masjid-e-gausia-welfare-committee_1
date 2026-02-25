/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Primary palette */
        ivory: {
          DEFAULT: 'oklch(97% 0.018 85)',
          50: 'oklch(99% 0.008 85)',
          100: 'oklch(97% 0.018 85)',
          200: 'oklch(94% 0.025 85)',
        },
        champagne: {
          DEFAULT: 'oklch(92% 0.03 80)',
          50: 'oklch(96% 0.015 80)',
          100: 'oklch(92% 0.03 80)',
          200: 'oklch(88% 0.04 80)',
        },
        orange: {
          DEFAULT: 'oklch(65% 0.18 50)',
          50: 'oklch(95% 0.04 50)',
          100: 'oklch(90% 0.08 50)',
          200: 'oklch(80% 0.13 50)',
          300: 'oklch(73% 0.16 50)',
          400: 'oklch(68% 0.17 50)',
          500: 'oklch(65% 0.18 50)',
          600: 'oklch(60% 0.18 50)',
          700: 'oklch(54% 0.17 50)',
          800: 'oklch(46% 0.15 50)',
          900: 'oklch(38% 0.12 50)',
        },
        gold: {
          DEFAULT: 'oklch(78% 0.12 85)',
          50: 'oklch(97% 0.03 85)',
          100: 'oklch(93% 0.06 85)',
          200: 'oklch(88% 0.09 85)',
          300: 'oklch(83% 0.11 85)',
          400: 'oklch(78% 0.12 85)',
          500: 'oklch(72% 0.13 85)',
          600: 'oklch(65% 0.12 85)',
          700: 'oklch(56% 0.11 85)',
          800: 'oklch(46% 0.09 85)',
          900: 'oklch(36% 0.07 85)',
        },
        forest: {
          DEFAULT: 'oklch(35% 0.1 145)',
          light: 'oklch(45% 0.12 145)',
          dark: 'oklch(25% 0.08 145)',
        },
        'near-black': {
          DEFAULT: 'oklch(18% 0.01 60)',
          light: 'oklch(25% 0.015 60)',
          lighter: 'oklch(35% 0.02 60)',
        },
        /* Shadcn semantic tokens */
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: ['"Noto Sans Devanagari"', '"Noto Sans"', 'sans-serif'],
        serif: ['"Noto Serif Devanagari"', 'Georgia', 'serif'],
        arabic: ['"Amiri"', '"Scheherazade New"', '"Noto Naskh Arabic"', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        gold: '0 4px 24px -4px oklch(78% 0.12 85 / 0.3)',
        orange: '0 4px 24px -4px oklch(65% 0.18 50 / 0.35)',
        mosque: '0 8px 40px -8px oklch(18% 0.01 60 / 0.5)',
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
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
