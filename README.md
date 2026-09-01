# Wedding Memory QR Video Frame

A premium wedding memory experience that shows a luxury frame and a video behind it, with a QR code intended for a physical frame.

## Features

- Premium wedding aesthetic with soft ivory and warm gold tones
- Memory page with elegant loading animation and cinematic reveal
- Video displayed inside a reusable frame component
- Mobile-first responsive layout
- QR generation based on a configurable memory URL
- Reusable memory data model for future weddings and content updates

## Local Run

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4173
```

Then open:

- http://localhost:4173/
- http://localhost:4173/memory/wedding-001

## App Structure

- `src/components` – reusable UI blocks
- `src/pages/MemoryPage.jsx` – wedding memory page
- `src/data/memories.js` – configurable memory data
- `src/assets/frame` – frame asset
- `src/assets/video` – video and poster assets
