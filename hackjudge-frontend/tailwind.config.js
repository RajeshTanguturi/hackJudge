// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS, JSX, TS, TSX files in the src directory
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // Make sure this matches your project structure
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'brand': {
//           'purple': '#673ab7',
//           'orange': '#f39c12', // Using f39c12 as primary orange
//           'pink': '#e91e63',
//         },
//         'text': {
//           'dark': '#333333',
//           'medium': '#757575',
//           'link': '#007bff',
//         },
//         // You can add more shades if needed
//       },
//       backgroundImage: {
//         // Define your custom gradients here
//         'gradient-main': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
//         'gradient-button': 'linear-gradient(to right, var(--tw-gradient-stops))',
//       },
//       // You can define gradient color stops here for reuse,
//       // or define them directly in the backgroundImage if preferred.
//       // For more complex gradients or easier reuse, define stops:
//       gradientColorStops: theme => ({
//         ...theme('colors'), // Makes existing colors available
//         'main-start': '#673ab7',
//         'main-end': '#f39c12',
//         'button-start': '#f39c12',
//         'button-end': '#e91e63',
//       }),
//     },
//   },
//   plugins: [],
// }


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//          green: {
//           400: '#4ade80',
//           500: '#22c55e',
//           600: '#16a34a',
//         },
//         blue: {
//           400: '#60a5fa',
//           600: '#2563eb',
//         },
//         teal: {
//           300: '#5eead4',
//         },
//         // Custom colors based on your components
//         purple: {
//           50: '#f5f3ff', // Not explicitly used but good to have a light shade
//           100: '#ede9fe',
//           200: '#ddd6fe',
//           300: '#c4b5fd',
//           400: '#a78bfa',
//           500: '#8b5cf6',
//           600: '#7c3aed', // Used in bg-purple-600, text-purple-600
//           700: '#6d28d9', // Used in text-purple-700
//           800: '#5b21b6',
//           900: '#4c1d95',
//         },
//         orange: {
//           50: '#fff7ed', // Used in bg-orange-50
//           100: '#ffedd5',
//           200: '#fed7aa',
//           300: '#fdba74', // Used in bg-orange-300
//           400: '#fb923c', // Used in to-orange-400, hover:border-orange-400
//           500: '#f97316', // Used in text-orange-500, border-orange-500, ring-orange-500, focus:ring-orange-500, focus:border-orange-500, from-orange-500
//           600: '#ea580c', // Used in text-orange-600, hover:from-orange-600
//           700: '#c2410c',
//           800: '#9a3412',
//           900: '#7c2d12',
//         },
//         pink: {
//           // You only used pink-400 and pink-500, but these are common shades
//           100: '#fce7f3',
//           200: '#fbcfe8',
//           300: '#f9a8d4',
//           400: '#f472b6', // Used in bg-pink-400
//           500: '#ec4899', // Used in to-pink-500
//           600: '#db2777', // Used in hover:to-pink-600
//           700: '#be185d',
//           800: '#9d174d',
//           900: '#831843',
//         },
//         gray: {
//           300: '#d1d5db', // Used in border-gray-300
//           400: '#9ca3af', // Used in text-gray-400
//           600: '#4b5563', // Used in text-gray-600
//           700: '#374151', // Used in text-gray-700
//           900: '#111827', // Used in text-gray-900
//         },
//       },
//       keyframes: {
//         float: {
//           '0%, 100%': { transform: 'translateY(0px)' },
//           '50%': { transform: 'translateY(-10px)' }, // Adjust value for more/less float
//         },
//       },
//       animation: {
//         'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
//         'pulse-slower': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
//         'float-slow': 'float 5s ease-in-out infinite;',
//         'float-slower': 'float 7s ease-in-out infinite;',
//       }
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Used in bg-purple-500
          600: '#7c3aed', // Used in bg-purple-600, text-purple-600
          700: '#6d28d9', // Used in text-purple-700
          800: '#5b21b6',
          900: '#4c1d95',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74', // Used in bg-orange-300
          400: '#fb923c', // Used in to-orange-400, hover:border-orange-400
          500: '#f97316', // Used in text-orange-500, border-orange-500, ring-orange-500, focus:ring-orange-500, focus:border-orange-500, from-orange-500
          600: '#ea580c', // Used in text-orange-600, hover:from-orange-600
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        pink: {
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6', // Used in bg-pink-400
          500: '#ec4899', // Used in to-pink-500
          600: '#db2777', // Used in hover:to-pink-600
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        gray: {
          100: '#f3f4f6', // Used in bg-gray-100
          300: '#d1d5db', // Used in border-gray-300
          400: '#9ca3af', // Used in text-gray-400
          500: '#6b7280', // Added for versatility
          600: '#4b5563', // Used in text-gray-600
          700: '#374151', // Used in text-gray-700
          800: '#1f2937', // Added for versatility
          900: '#111827', // Used in text-gray-900
        },
        // Adding other common colors for variety in the landing page
        blue: {
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa', // Used in bg-blue-400
          500: '#3b82f6',
          600: '#2563eb', // Used in to-blue-600
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        green: {
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efad',
          400: '#4ade80', // Used in bg-green-400
          500: '#22c55e', // Used in from-green-500
          600: '#16a34a', // Used in text-green-700 (adjusting to 600 for better contrast)
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        teal: {
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4', // Used in bg-teal-300
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      // Keyframes for custom animations
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '25%': { transform: 'translateY(-5px) translateX(5px)' },
          '50%': { transform: 'translateY(-10px) translateX(0px)' },
          '75%': { transform: 'translateY(-5px) translateX(-5px)' },
        },
        'rotate-pulse': {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(45deg) scale(1.05)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      // Apply animations
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
        'pulse-slower': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
        'float-slow': 'float 8s ease-in-out infinite;',
        'float-slower': 'float 10s ease-in-out infinite;',
        'rotate-pulse': 'rotate-pulse 6s ease-in-out infinite;',
        'fade-in-up': 'fade-in-up 0.7s ease-out forwards;',
      }
    },
  },
  plugins: [],
}