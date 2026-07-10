import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Purple-tinted near-black scale, mirrored from Nono-web-wallet's design tokens.
        ink: {
          950: '#08070D', // --bg
          900: '#11101A', // --surface
          800: '#171323', // --surface-2
          700: '#1e192e', // --surface-elevated
          400: '#6E6E80', // --text-dim
          300: '#A8A8B8', // --text-mid
          100: '#FFFFFF', // --text
        },
        nono: {
          primary: '#745BC6',
          secondary: '#5B4A8E',
          highlight: '#BFAEFF',
          action: '#745BC6',
          'action-hover': '#8A72D8',
        },
        line: {
          soft: 'rgba(191, 174, 255, 0.08)',
          strong: 'rgba(191, 174, 255, 0.15)',
          focus: 'rgba(191, 174, 255, 0.35)',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        prose: '65ch',
      },
      boxShadow: {
        glow: '0 8px 28px rgba(116, 91, 198, 0.40)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #5B4A8E 0%, #745BC6 45%, #BFAEFF 100%)',
      },
    },
  },
  plugins: [typography],
};
