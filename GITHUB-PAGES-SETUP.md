# Publish COLORVAULT on GitHub Pages

Repository: `tubagusbangsawan/colorvault`

Expected public URL: https://tubagusbangsawan.github.io/colorvault/

## Upload from the GitHub website
1. Open the `colorvault` repository.
2. Choose **Add file → Upload files**.
3. Upload the *contents* of this folder into the repository root (do not upload the enclosing folder itself).
4. Do not upload `node_modules/` or `dist/`.
5. Commit to the `main` branch.

## Enable GitHub Pages
1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Open the **Actions** tab and wait for **Deploy COLORVAULT to GitHub Pages** to finish successfully.
4. Visit https://tubagusbangsawan.github.io/colorvault/.

## Future updates
Upload changed source files to the `main` branch. The workflow automatically installs dependencies, builds the site, and deploys it.

## Notes
- This is a Vite + React static website; no backend is required for hosting.
- Saved palettes use browser localStorage and are local to each visitor's browser/device.
