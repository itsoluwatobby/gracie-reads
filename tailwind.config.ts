/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      
      'mdXl': '968px',
      // => @media (min-width: 968px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      midScreen: {'max': '767px'},
      maxScreen: {'max': '639px'},
      maxMobile: {'max': '580px'},
      mobile: {'max': '480px'},
      midMobile: {'max': '380px'},
      minMobile: {'max': '280px'},
    },
  },
  plugins: [],
}