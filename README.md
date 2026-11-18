# COLORVAULT // BRUTALIST CHROMATIC STUDIO

> **FIND YOUR PERFECT COLOR.**  
> An authentic Brutalist Web Design color utility & chromatic archive for independent graphic designers, typographers, software engineers, and digital artists.

---

## ⚡ Visual Art Direction

**COLORVAULT** has been redesigned following raw, editorial brutalist web design principles:

- **Color Palette:**
  - Main Background: Off-white / light grey (`#EEEEEE`)
  - Primary Text: Deep black (`#080808`)
  - Accents: Electric blue (`#2020FF`), Signal red (`#FF321C`), Neon green (`#39FF14`), Caution yellow (`#FFDE00`)
  - Zero purple SaaS aesthetics, zero artificial gradients, zero blurry drop shadows
- **Typography:**
  - Heavy Display / Grotesk: `Syne` and `Space Grotesk` for oversized editorial headlines
  - Monospace Data: `Space Mono` and `JetBrains Mono` for metadata, navigation, coordinates, and technical labels
- **Layout & Interaction:**
  - Sharp black outlines (`border-2 border-black`, `border-black`)
  - Hard brutalist drop shadows (`shadow-brutal`: `4px 4px 0px #080808`)
  - Monolithic color slabs, editorial index directory, running ticker strips, and instant hover state inversions

---

## 🛠️ Complete Feature Suite

### 1. Palette Synthesizer (`/` and `/generator`)
- **5-Slot Chromatic Deck:** Cohesive palette generation with individual slot locking (`[LOCKED]` vs `[OPEN]`).
- **Keyboard Shortcuts:** `Spacebar` to regenerate unlocked slots, `C` to copy all HEX codes, `S` to save to My Vault.
- **Inline Tweak Console:** Adjust hex codes manually or via native picker with instant preview.
- **Exports:** Download clean CSS root variables (`:root { --color-... }`) or export a high-resolution PNG card.

### 2. Chromatic Archive (`/explore`)
- **36 Original Static Palettes:** Categorized into `Warm`, `Cool`, `Pastel`, `Neutral`, `Vibrant`, and `Dark`.
- **Search Terminal:** Query instantly by palette name, tags, or HEX codes.
- **Brutalist Cards:** Individual swatch copy, full palette dump, and direct bookmarking to My Vault.

### 3. Color Probe & Converter (`/picker`)
- **Eyedropper & Coordinate Probe:** Live preview with automatic high-contrast readout.
- **Tri-Model Conversion:** Real-time calculation across HEX, RGB ($0$–$255$), and HSL ($0$–$360^\circ$, $0$–$100\%$, $0$–$100\%$).
- **Channel Adjuster:** Interactive sliders with dedicated **HSL** and **RGB** modes.
- **Optical Complement:** Displays the exact $180^\circ$ opposite color in a split juxtaposition card.
- **Lightness Steps:** 6 calibrated steps ($15\%$ to $90\%$).

### 4. Color Harmony Explorer (`/harmony`)
- **Geometric 360° Hue Rotations:**
  - **Complementary:** $180^\circ$ diametrical opposite
  - **Analogous:** $\pm 30^\circ$ adjacent rhythm
  - **Triadic:** $120^\circ$ equilateral triangle
  - **Split-Complementary:** $150^\circ$ and $210^\circ$ split complement
  - **Tetradic:** $90^\circ$ interval square double-complement
  - **Monochromatic:** $0^\circ$ uniform hue with 5 calibrated lightness/saturation steps
- **Live Harmonic Deck:** 5-slot ribbon with instant copy and vault bookmarking.

### 5. WCAG 2.1 Contrast Checker (`/contrast`)
- **W3C Relative Luminance Calculation:**
  $$L = 0.2126 \times R_{\text{lin}} + 0.7152 \times G_{\text{lin}} + 0.0722 \times B_{\text{lin}}$$
  $$\text{Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$
- **Scoreboard & Matrix:** Exact checks for AA Normal ($\ge 4.5:1$), AA Large ($\ge 3:1$), AAA Normal ($\ge 7:1$), AAA Large ($\ge 4.5:1$).
- **Live Typographic Specimen:** Tests real headlines, body text, buttons, and badges in real-time.
- **Swap Invert:** One-click foreground/background color inversion.

### 6. Gradient Studio (`/gradient`)
- **Linear & Radial Matrix:** Directional linear with $0^\circ$–$360^\circ$ angle rotation and center radial.
- **Multi-Stop Controller:** Add, remove, and adjust positions ($0$–$100\%$) for up to 7 color stops.
- **High-Impact Presets:** *Electric Matrix*, *Signal Warning*, *Monochrome Glaze*, *Acid Terminal*, etc.
- **Exports:** Copy production-ready CSS or download a 2x PNG raster canvas.

### 7. My Vault (`/vault`)
- **Isolated Browser Dossier:** Persists your color palettes in `localStorage` without external databases.
- **JSON Dump & Restore:** Export complete archive as JSON or import backup files with strict schema validation.
- **Record Management:** Rename palettes inline or delete records.

### 8. Manifesto & Legal Pages
- `/about`: The anti-SaaS, client-side, zero-AI manifesto.
- `/privacy`: Transparent client-side privacy statement and Google AdSense notice.
- `/terms`: Unconditional royalty-free ownership guarantee for all computed colors.
- `/contact`: Editorial dispatch telegram form with email client integration.

### 9. Google AdSense Integration
- Reusable, non-intrusive `AdContainer` components with sharp black borders and `[COMMERCIAL DISPATCH // ADVERTISEMENT]` tags.
- Configured for Google AdSense with `VITE_ADSENSE_CLIENT_ID`.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Execute automated test suite (40 tests)
npm test

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 🧪 Automated Testing

All 40 unit and integration tests pass:
```bash
npm test
```
Verifies HEX normalization, RGB/HSL bidirectional conversions, WCAG 2.1 relative luminance and contrast ratios against W3C benchmarks, HSL harmony geometry, storage schema validation, and CSS variable export formatting.

## GitHub Pages Deployment

Public website: https://tubagusbangsawan.github.io/colorvault/

This repository includes a GitHub Actions workflow for automatic deployment. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the deployment source. Push changes to `main` to rebuild and redeploy.

See [GITHUB-PAGES-SETUP.md](./GITHUB-PAGES-SETUP.md) for browser-upload instructions.
