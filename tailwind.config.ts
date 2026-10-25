import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#f1f7f5',
          100: '#dfeee8',
          500: '#0a5d4d',
          700: '#073d32',
          900: '#052f27',
        },
        gold: {
          200: '#f5e7c4',
          300: '#e9d6a1',
          500: '#d9b66f',
        },
        ivory: '#faf8f1',
        chalk: '#fffdf8',
        sage: '#6e7c74',
        charcoal: '#172b25',
      },
      boxShadow: {
        soft: '0 18px 40px rgba(7, 61, 50, 0.08)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(217,182,111,0.2), transparent 40%)',
      },
    },
  },
  plugins: [],
}

export default config
