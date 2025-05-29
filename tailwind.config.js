// module.exports = {
//   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {
//       colors: {
//         primary: '#4A90E2',
//         secondary: '#50E3C2',
//         accent: '#F5A623',
//       },
//       spacing: {
//         '128': '32rem',
//         '144': '36rem',
//       },
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1976D2',         // Main Blue
        secondary: '#009688',       // Teal
        accent: '#4CAF50',          // Green accent

        hospital: '#D32F2F',        // Red
        pharmacy: '#388E3C',        // Dark Green
        clinic: '#3F51B5',          // Indigo
        ambulance: '#F57C00',       // Orange

        accessible: '#2E7D32',      // Green
        inaccessible: '#9E9E9E',    // Gray
        unknown: '#FBC02D',         // Yellow

        background: '#F5F5F5',
        surface: '#FFFFFF',
        textPrimary: '#212121',
        textSecondary: '#616161'
      },
    },
  },
  plugins: [],
}

// Optional: Add classes for marker styles in your CSS or utility config
// .marker-hospital { background-color: #D32F2F; }
// .marker-pharmacy { background-color: #388E3C; }
// etc.
