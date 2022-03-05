// tailwind.config.js
module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
  extend: {
    keyframes: {
      wiggle: {
        '0%': { transform: 'translate3d(0,100%,0)' },
        'to': { transform: 'translateZ(0)' },
      }
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out',
    },
    colors: {
      'main': '#EDA345',
      'yellow1': '#EDA345',
      'green1': '#264A36',
      'red1': '#DB0007',
      'main': '#EDA345'
    },
    maxHeight: {
      '80': '80%'
    },

    backgroundImage: {
      'food-bg': "url('/foodbg.jpg')"
    },
  },
  },
  variants: {
  extend: {},
  },
  plugins: [],
}
  
  