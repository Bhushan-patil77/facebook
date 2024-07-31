// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths as needed
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        // Custom highlighter border color
        'highlight-color': '#ff00ff', // Bright color for highlighting
      },
      borderWidth: {
        'highlight': '4px', // Custom width for highlighter border
      },
      zIndex: {
        '0': '0',
        '1': '1',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60', 
        '70': '70', 
        '80': '80',
        '90': '90',
        '100': '100',
        'dropdown': '9999',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.b1': {
          borderWidth: '2px',
          borderColor: 'red',
        },
        '.b2': {
          borderWidth: '2px',
          borderColor: 'green',
        },
        '.b3': {
          borderWidth: '2px',
          borderColor: 'blue',
        },
        '.b4': {
          borderWidth: '2px',
          borderColor: 'pink',
        },
   
      }, ['responsive', 'hover']);
    },
  ],
};
