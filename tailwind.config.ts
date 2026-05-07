/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'Poppins', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'DM Sans', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: '#12120F',
        accent: '#DBF241',
        'accent-hover': '#C5DA3A',
        warm: {
          50: '#F5F3EF',
          100: '#E8E6E1',
          200: '#D4D0C8',
          300: '#B5B0A4',
          400: '#948E80',
          500: '#7A7468',
          600: '#625D52',
          700: '#4A4640',
          800: '#35322E',
          900: '#1E1D1A',
        },
      },
    },
  },
  plugins: [],
}
