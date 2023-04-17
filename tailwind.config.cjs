/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        // 'double': '200%',
        // 'triple': '300%',
        // 'quad': '400%'
        'double': 'calc(200% + 1rem)',
        'triple': 'calc(300% + 2rem)',
        'quad': 'calc(400% + 3rem)'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["luxury", "bumblebee"]
  }
}
