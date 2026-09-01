# Wedding Memory QR Video Frame

A premium AR wedding memory experience using MindAR image recognition. Point your camera at a wedding frame to unlock an immersive video memory overlay with QR code scanning.

## Features

- 🎥 **Real AR Experience** – Uses phone camera and frame recognition via MindAR
- 📱 **QR Scanner** – Live camera QR code detection with visual feedback
- 🔐 **HTTPS/SSL** – Secure mobile camera access on Safari
- 🎨 **Premium Design** – Luxury aesthetic with ivory and warm gold tones
- 📡 **Network Ready** – Access from mobile devices on local WiFi
- ⚙️ **Configurable** – Easy memory data model for multiple weddings

## Features

### AR Memory Page
- Real-time frame tracking with MindAR
- Video playback anchored to physical frame
- Sound control with user gesture requirement
- Mobile camera access with permission handling

### QR Scanner
- Live camera feed with visual scanning frame
- Real-time QR code detection
- Success indicator feedback
- Auto-proceed to AR after QR scan

### Start Screen
- Displayable QR code for easy sharing
- One-tap scanner launch
- Desktop preview mode

## Local Development

```bash
npm install
npm run dev
```

Server accessible at:
- **Desktop:** https://localhost:8001/
- **Mobile (same WiFi):** https://192.168.31.249:8001/
  - Replace IP with your local network IP from `ipconfig`

## Deploy to Vercel

### 1. Connect to Vercel
```bash
npm i -g vercel
vercel
```

### 2. Or connect via GitHub
- Push code to GitHub
- Visit [vercel.com](https://vercel.com/new)
- Import the repository
- Click Deploy

### 3. Configuration
The project includes:
- `vercel.json` – Build configuration
- `.vercelignore` – Files to skip during deployment

## App Structure

- `src/components` – Reusable UI components
  - `StartAR.jsx` – Start screen with QR display
  - `QRScanner.jsx` – Live camera QR scanner
  - `ARStatus.jsx` – AR tracking status display
  - `SoundButton.jsx` – Audio control
- `src/pages/ARMemoryPage.jsx` – Main AR page
- `src/ar/` – AR logic
  - `MindARScene.jsx` – MindAR scene setup
  - `QRDetector.jsx` – QR detection logic
  - `arConfig.js` – AR configuration
- `src/data/memories.js` – Memory data model
- `src/assets/` – Frame and video assets

## Mobile Deployment Notes

- Requires HTTPS for camera access (Vercel provides this)
- Mobile Safari on iOS requires user permission
- Tap **"Allow"** when prompted for camera access
- Best experience on iPhone 12+ with good lighting

## Environment Setup

### Target Image Generation

To generate a MindAR target image from your physical wedding frame:

1. Ensure your frame image is saved as `public/assets/frame/wedding-frame.png`
2. Visit [MindAR Target Generator](https://create.mind-ar.com/)
3. Upload your frame image
4. Generate and download the `.mind` file
5. Place at `public/targets/wedding-frame.mind`
6. Restart the dev server

See [AR_TARGET_SETUP.md](./AR_TARGET_SETUP.md) for detailed instructions.

## Tech Stack

- **Frontend:** React + Vite
- **AR:** MindAR + Three.js
- **QR:** jsQR (detection), qrcode.react (generation)
- **Styling:** Tailwind CSS + Framer Motion
- **Hosting:** Vercel

