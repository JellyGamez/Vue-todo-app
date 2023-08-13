/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,vue}",
    "./*.{html,js,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pt-sans': ['"PT Sans"'],
      }
    },
  },
  plugins: [],
}

