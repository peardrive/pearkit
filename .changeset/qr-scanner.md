---
"pearkit": minor
---

`QRScanner`: the camera as a QR reader, the counterpart of `QRCode`. A framed viewfinder with a close button, `accept` to say which codes count and `onScan` for the one that does, a title and description under the frame and a paste alternative. The camera is `expo-camera`, an optional peer dependency; where it is not installed (the web, Storybook, a desktop) the frame says so and offers the paste button, so a join screen is one screen on every platform.
