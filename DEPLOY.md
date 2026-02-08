# Deploy to GitHub Pages

## Option 1: Automatic Deployment (Recommended)

This project is configured with GitHub Actions for automatic deployment on every push to `main`.

### Setup Steps:

1. **Create a GitHub repository** for this project
   - Go to https://github.com/new
   - Name it `sigtrip-dashboard` (or your preferred name)
   - Make it public (required for free GitHub Pages)

2. **Push the code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sigtrip-dashboard.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repo on GitHub → Settings → Pages
   - Source: Select "GitHub Actions"

4. **Update `base` URL in `vite.config.ts`:**
   ```ts
   const BASE_URL = '/sigtrip-dashboard/'  // Must match your repo name
   ```
   If your repo name is different, update this!

5. **Push the change:**
   ```bash
   git add vite.config.ts
   git commit -m "Update base URL for GitHub Pages"
   git push
   ```

The site will automatically deploy at:
`https://YOUR_USERNAME.github.io/sigtrip-dashboard/`

---

## Option 2: Manual Deployment

Deploy manually from your local machine:

```bash
# Make sure base URL is set correctly in vite.config.ts
npm run deploy
```

This will build and push the `dist` folder to the `gh-pages` branch.

---

## Custom Domain (Optional)

To use a custom domain (e.g., `dashboard.sigtrip.com`):

1. Add a `CNAME` file in the `public/` folder with your domain
2. Update DNS settings with your domain provider
3. Update `vite.config.ts`:
   ```ts
   const BASE_URL = '/'  // Root path for custom domain
   ```

---

## Troubleshooting

### "404 Not Found" errors
- Check that `BASE_URL` in `vite.config.ts` matches your repo name exactly
- For username.github.io repos (no repo name in URL), use `BASE_URL = '/'`

### Assets not loading
- Make sure all assets use relative paths
- Check browser console for 404 errors

### Build fails
- Ensure `dist` folder is not in `.gitignore`
- Check that all dependencies are installed: `npm ci`
