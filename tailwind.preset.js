/**
 * pearkit Tailwind preset.
 *
 *   // tailwind.config.js
 *   module.exports = {
 *     content: ['./src/**\/*.{ts,tsx}', './node_modules/pearkit/src/**\/*.{ts,tsx}'],
 *     presets: [require('nativewind/preset'), require('pearkit/tailwind-preset')],
 *   };
 *
 * Colours read the `--pk-*` CSS variables that <ThemeProvider/> injects, so a
 * theme switch never needs a Tailwind rebuild. Radii, type scale and spacing are
 * plain values — extend or override them in your own config to re-skin the kit.
 */
const plugin = require('tailwindcss/plugin');

const tokens = [
  'background', 'pane', 'sidebar', 'sidebar-to', 'overlay', 'inset', 'tooltip', 'tooltip-foreground',
  'foreground', 'muted', 'subtle', 'icon', 'icon-strong',
  'primary', 'primary-foreground', 'primary-strong', 'primary-text', 'selected',
  'success', 'warning', 'danger', 'danger-foreground', 'neutral', 'info', 'accent', 'favorite',
  'window-close', 'window-minimize', 'window-maximize', 'window-inactive',
  'qr-background', 'qr-foreground',
  'playhead',
];

const colors = Object.fromEntries(tokens.map((t) => [t, `rgb(var(--pk-${t}) / <alpha-value>)`]));

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Type scale lifted from the PearDrop Figma file.
      fontSize: {
        overline: ['10.5px', { letterSpacing: '0.84px' }], // section labels (LIBRARY, DETAILS)
        micro: '11px', // pills, timestamps
        caption: '11.5px', // secondary lines
        label: '12px', // meta, key/value rows
        'body-sm': '12.5px', // small buttons, search
        body: '13px', // nav items, buttons
        'body-lg': '13.5px', // row titles, card titles
        title: '18px', // pane titles
        display: '21px', // detail hero
      },
      borderRadius: {
        xs: '5px',
        sm: '7px',
        md: '8px',
        field: '9px',
        control: '10px',
        lg: '12px',
        card: '14px',
        xl: '16px',
        window: '14px',
      },
      spacing: {
        4.5: '18px',
        13: '52px',
        15: '60px',
        17: '68px',
        27: '108px',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      // Electron frameless windows: mark draggable title-bar areas.
      // Ignored on native platforms.
      addUtilities({
        '.app-region-drag': { '-webkit-app-region': 'drag' },
        '.app-region-no-drag': { '-webkit-app-region': 'no-drag' },
      });
    }),
  ],
};
