module.exports = {
  content: [    
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#EDA345',
        'yellow1': '#EDA345',
        'green1': '#264A36',
        'red1': '#DB0007',
      },
      maxHeight: {
        '80': '80%'
      }
    },
  },
  plugins: [],
}
