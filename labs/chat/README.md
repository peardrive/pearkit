# Chat lab

The chat pieces on their own, on a port, to try from a phone or a browser before they move into Pearkit
(`src/components/Chat`) and from there into Pearkit Studio, Pearcast and rKeyChat.

    npx vite --config labs/chat/vite.config.mjs      →  http://<this Mac>:5190

- `src/chat/types.ts`: the standard. One message shape, one list of feature switches, two presets (`SIDEBAR`, `ROOM`).
- `src/chat/Chat.tsx`: the message list and the composer. It holds no messages and talks to no network.
- `src/Lab.tsx`, `src/scenarios.ts`: the page around it. Pretend people and a pretend agent; nothing here is real.
- "Send to Claude" in the switches writes the note and the switches to `feedback.jsonl` here (not committed).
