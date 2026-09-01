# 📱 Android QR Scanning Setup Guide

## Problem
When scanning the QR code from an Android device, Chrome shows:
- "Network Error"
- "This site can't be reached"

## Root Cause
- **Development URLs** (localhost, 127.0.0.1) only work on the same device
- **Android phones** cannot access localhost on your computer
- **Both devices must be on the same Wi-Fi network**

---

## ✅ Solution: Use Your PC's Local IP Address

### Step 1: Find Your PC's IP Address

#### Windows:
```cmd
ipconfig
```

Look for the line starting with `IPv4 Address` in the section for your active network. It should look like:
```
IPv4 Address. . . . . . . . . . . : 192.168.31.249
```

Copy this IP address.

#### Mac/Linux:
```bash
ifconfig
```

Look for `inet` address (usually starts with 192.168.x.x, 10.x.x.x, or 172.x.x.x)

### Step 2: Verify Same Wi-Fi Network
- Ensure your **Android phone** and **computer** are connected to the **same Wi-Fi network**
- Check phone Settings → Wi-Fi to confirm

### Step 3: Start the Development Server
```bash
cd d:\qrframe
npm run dev
```

You should see output like:
```
VITE v8.2.2  ready in xxx ms

➜  Local:   https://localhost:8001/
➜  Network: https://192.168.31.249:8001/  Wi-Fi
```

### Step 4: Generate QR Code

1. Open the development server in Chrome on your **computer**:
   ```
   https://192.168.31.249:8001/
   ```

2. The QR code on the start screen will automatically show the correct URL
3. Take a screenshot of the QR code or keep it on screen

### Step 5: Scan from Android Phone

1. Open **Google Lens** or your camera app on Android
2. Point at the QR code on your computer screen
3. Tap the notification to open it in Chrome
4. Accept the SSL certificate warning (tap "Advanced" → "Proceed")
5. Tap "Allow" for camera permission
6. Tap "Start Scanner" button
7. Point at your wedding frame to begin AR experience

---

## URL Examples

### ✅ Correct (Will Work)
```
https://192.168.31.249:8001/
https://192.168.31.100:8001/  (if your IP is different)
https://your-domain.com/     (production only)
```

### ❌ Incorrect (Won't Work on Android)
```
http://localhost:8001/      ← Only works on same PC
http://127.0.0.1:8001/      ← Only works on same PC
http://192.168.31.249:8001/ ← HTTP won't work (AR needs HTTPS)
```

---

## SSL Certificate Warning

When opening `https://192.168.31.249:8001/` for the first time:

1. Chrome shows "Your connection is not private"
2. Tap **Advanced** button
3. Tap **Proceed to 192.168.31.249 (unsafe)**
4. This is normal for development - self-signed certificates are used

---

## Troubleshooting

### Phone shows "Unable to reach this page"
- ✓ Verify both devices are on the same Wi-Fi
- ✓ Check IP address is correct (use `ipconfig` again)
- ✓ Verify dev server is running: `npm run dev`
- ✓ Try accessing directly in Chrome: `https://192.168.31.249:8001/`

### Chrome shows "Network Error"
- ✓ Check internet connection
- ✓ Disable mobile data temporarily (use Wi-Fi only)
- ✓ Restart Wi-Fi on phone
- ✓ Check Windows Firewall isn't blocking port 8001

### Camera permission not working
- ✓ Tap "Allow" when prompted
- ✓ Check Chrome Settings → Privacy → Site Settings → Camera
- ✓ If blocked, manually allow: Chrome → Site Settings → Camera → Allow

### Video not playing
- ✓ Check video file path is correct: `/assets/video/wedding-video.mp4`
- ✓ Verify video is in: `public/assets/video/wedding-video.mp4`
- ✓ Check browser console for errors

---

## Development vs Production

| Aspect | Development | Production |
|--------|-------------|-----------|
| **URL** | https://192.168.31.249:8001/ | https://your-domain.com |
| **Certificate** | Self-signed (dev only) | Real SSL certificate |
| **Accessible From** | Same Wi-Fi network | Anywhere on internet |
| **QR Code** | Generated dynamically | Fixed in QR code |
| **Configuration** | Automatic from window.location | Set via VITE_APP_URL |

---

## Production Deployment

1. Deploy to Vercel or your hosting:
   ```bash
   npm run build
   ```

2. Update `.env.production`:
   ```
   VITE_APP_URL=https://your-domain.com
   ```

3. Generate production QR code:
   - The app will use the VITE_APP_URL
   - QR will point to: `https://your-domain.com`

4. Test from any Android device (any Wi-Fi, any location)

---

## Key Points

✅ **Development:** Local IP + same Wi-Fi = works  
✅ **Production:** HTTPS domain + internet = works  
❌ **Never use localhost for production**  
❌ **Never use HTTP for AR (needs HTTPS)**  
⚠️ **Android phone ≠ same network = network error**

---

For more help, check the error message on your phone or see console output:
```bash
npm run dev   # Shows the correct IP and port
```
