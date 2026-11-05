/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/renderer/**/*.{ts,tsx}', './node_modules/pearkit/src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset'), require('pearkit/tailwind-preset')],
};
