/** Tailwind config used by Storybook and the library build. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,mdx}', './.storybook/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset'), require('./tailwind.preset.js')],
};
