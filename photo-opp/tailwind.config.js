module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#606060',
        background: '#ffffff',
        backgroundGradientStart: '#f4f4f5',
        backgroundGradientEnd: '#d4d4d8',
        text: '#000000',
        textMuted: '#52525b',
        borderMuted: '#a1a1aa',
        success: '#16a34a',
        successHover: '#22c55e',
        danger: '#7f1d1d',
        dangerHover: '#991b1b',
      },
    },
  },
  plugins: [],
}
