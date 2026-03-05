/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#0B0F19',
          50: '#1A1F2E',
          100: '#151A26',
          900: '#0B0F19',
        },
        electric: {
          blue: '#4F46E5',
          cyan: '#06B6D4',
          violet: '#8B5CF6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-electric': 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 50%, #06B6D4 100%)',
        'gradient-glow': 'radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.15), transparent 50%)',
      },
    },
    accentColor: ({ theme }) => ({
      ...theme('colors'),
      auto: 'auto',
    }),
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

