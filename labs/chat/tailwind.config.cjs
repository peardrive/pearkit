const path = require('node:path');
const root = path.resolve(__dirname, '../..');
/** The lab's own Tailwind run: Pearkit's preset, over Pearkit's source and the lab's. */
module.exports = {
  content: [path.join(root, 'src/**/*.{ts,tsx}'), path.join(__dirname, 'src/**/*.{ts,tsx}')],
  presets: [require('nativewind/preset'), require(path.join(root, 'tailwind.preset.js'))],
};
