# Team Collaboration Guide

## Workflow for Coworkers to Contribute

### 1. First Time Setup (for each coworker)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/sigtrip-dashboard.git
cd sigtrip-dashboard

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

### 2. Making Changes

#### Option A: Direct Push (for small teams/trusted contributors)

```bash
# Pull latest changes first
git pull origin main

# Make your changes to the code...

# Add and commit
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

✅ **Site auto-deploys** after push (via GitHub Actions)

---

#### Option B: Pull Request Workflow (recommended for teams)

```bash
# Pull latest changes
git pull origin main

# Create a new branch for your feature
git checkout -b feature/my-update

# Make your changes...

# Add and commit
git add .
git commit -m "Add: description of changes"

# Push branch to GitHub
git push -u origin feature/my-update
```

Then on GitHub:
1. Go to the repo → **Pull Requests** → **New Pull Request**
2. Select your branch (`feature/my-update`) → compare to `main`
3. Add description and create PR
4. Team reviews and **Merge**

✅ **Site auto-deploys** after merge

---

### 3. What Gets Deployed

| What | Auto-Deploys? | How |
|------|---------------|-----|
| Code changes (TSX, TS, CSS) | ✅ Yes | Push to `main` |
| Default values changes | ✅ Yes | Push to `main` |
| New components | ✅ Yes | Push to `main` |
| README updates | ❌ No | Not part of build |

---

### 4. Common Tasks

#### Update default values (e.g., salaries, targets)
Edit `src/hooks/useDashboard.ts`:
```typescript
const defaultInputs: DashboardInputs = {
  raiseAmount: 5,           // ← Change this
  runwayMonths: 24,         // ← Or this
  nEngineers: 2,            // ← Or this
  // ...
}
```

Then push:
```bash
git add src/hooks/useDashboard.ts
git commit -m "Update: default raise amount to $6M"
git push origin main
```

#### Add a new chart
1. Edit `src/components/Charts.tsx`
2. Add component to exports
3. Use it in `src/App.tsx`
4. Push changes

---

### 5. Troubleshooting

**"I pushed but the site didn't update"**
- Check **Actions** tab on GitHub for build errors
- Make sure you're pushing to `main` branch
- GitHub Pages can take 2-3 minutes to update

**"My coworker's changes disappeared"**
- Always `git pull origin main` before making changes
- Resolve any merge conflicts

**"Build fails on GitHub"**
- Check that `npm run build` works locally first
- Ensure no TypeScript errors: `npx tsc --noEmit`

---

### 6. Quick Reference

```bash
# Daily workflow
git pull origin main          # Get latest changes
npm run dev                   # Start local server
# ... make changes ...
git add .
git commit -m "fix: chart spacing"
git push origin main          # Deploy!

# Check deployment status
# → Go to GitHub → Actions tab
```

---

### 7. Branch Naming Conventions (for PR workflow)

- `feature/add-pie-chart` - New features
- `fix/label-spacing` - Bug fixes
- `update/default-values` - Data updates
- `refactor/calculations` - Code refactoring
