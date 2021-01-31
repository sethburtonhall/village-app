const colors = require('tailwindcss/colors');

module.exports = {
  important: true,
  darkMode: 'class',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    fontFamily: {
      sans: ['Dosis', 'sans-serif'],
      serif: ['Roboto Slab', 'serif']
    },
    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px'
        // xl: '1280px',
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.blueGray,
      cyan: colors.cyan,
      pink: colors.pink,
      blue: colors.blue,
      yellow: colors.amber,
      purple: colors.purple,
      orange: colors.orange,
      green: colors.emerald
    },
    // fill: theme => theme(colors),
    extend: {
      screens: {
        '3xl': '1600px'
      }
      // backgroundImage: (theme) => ({
      //   code: "url('/bg4.jpg')",
      //   film: "url('/bg6.jpg')",
      // }),
    }
  },

  variants: {
    extend: {}
  },
  plugins: []
};
