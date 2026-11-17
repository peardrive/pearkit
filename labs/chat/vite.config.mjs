/**
 * The chat lab: the chat pieces alone, on a port, to try from a phone or a browser before they move into Pearkit.
 *
 *   npx vite --config labs/chat/vite.config.mjs        → http://<this Mac>:5190
 *
 * POST /feedback keeps what the person typed in the lab's "Notes" box (and the settings they had) in
 * labs/chat/feedback.jsonl, so a note written on the phone is on this Mac.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { pearkit } = require('../../vite.js');

const feedback = () => ({
  name: 'chat-lab:feedback',
  configureServer(server) {
    server.middlewares.use('/feedback', (req, res) => {
      if (req.method !== 'POST') { res.statusCode = 405; return res.end(); }
      let raw = '';
      req.on('data', (c) => { raw += c; if (raw.length > 200_000) req.destroy(); });
      req.on('end', () => {
        try {
          const body = JSON.parse(raw);
          fs.appendFileSync(path.join(here, 'feedback.jsonl'), JSON.stringify({ at: new Date().toISOString(), ...body }) + '\n');
          res.setHeader('Content-Type', 'application/json');
          res.end('{"ok":true}');
        } catch { res.statusCode = 400; res.end('{"ok":false}'); }
      });
    });
  },
});

export default defineConfig({
  root: here,
  plugins: [...pearkit(), feedback()],
  css: { postcss: here },
  resolve: { alias: { pearkit: path.resolve(here, '../../src/index.ts') } },
  server: { host: '0.0.0.0', port: 5190, strictPort: true, allowedHosts: true, fs: { allow: [path.resolve(here, '../..'), fs.realpathSync(path.resolve(here, '../../node_modules'))] } },
});
