/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{ts,tsx}', './node_modules/pearkit/src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset'), require('pearkit/tailwind-preset')],
};
