# AR Target Setup for the Wedding Frame

This app expects a real MindAR image target for the actual physical wedding frame.

## 1) Capture the real frame image

- Take a clear, high-quality photo of the real wedding frame.
- Make sure the full frame is visible with good lighting.
- Use a high-resolution image with no website overlay or fake UI.
- Prefer a plain photo of the physical frame itself.

## 2) Crop the image to the frame only

- Remove all background around the frame.
- Keep the frame border as the main subject.
- Make the frame fill most of the image area.
- Avoid shadows or clutter close to the edge.

## 3) Create the MindAR target file

Use the official MindAR compiler:

- https://hiukim.github.io/mind-ar-js-doc/tools/compile

Upload the real frame image and generate the target file.

## 4) Save the output

Put the generated `.mind` file here:

- public/targets/wedding-frame.mind

## 5) Keep it real

Do not use a screenshot of the website.
Do not use a virtual mock frame.
Do not use a QR card image.
The target must be the actual physical wedding frame.

## 6) Update memory config

When you add another wedding memory, update the data in `src/data/memories.js` and attach a corresponding target file.

Example:

```js
{
  id: 'wedding-002',
  qrValue: 'https://your-domain.com/memory/wedding-002',
  video: '/assets/video/wedding-video.mp4',
  target: '/targets/wedding-frame.mind'
}
```
