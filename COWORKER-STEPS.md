# Step-by-Step Guide for Coworkers

## Your GitHub: https://github.com/change101/sigtrip-dashboard

---

## STEP 1: Download the Code (One Time Only)

Open Terminal and run:

```bash
cd Desktop
git clone https://github.com/change101/sigtrip-dashboard.git
cd sigtrip-dashboard
npm install
```

Wait for installation to finish (~2 minutes).

---

## STEP 2: Start Working

```bash
npm run dev
```

Open browser: `http://localhost:5173`

You can now see the dashboard locally. Keep this terminal open while working.

---

## STEP 3: Make Your Changes

### To update default values (salaries, targets, etc.):

1. Open file: `src/hooks/useDashboard.ts`
2. Find the `defaultInputs` section
3. Change any numbers you want, for example:

```typescript
// BEFORE
nEngineers: 2,
targetHotels: 3500,

// AFTER  
nEngineers: 3,
targetHotels: 5000,
```

4. Save the file
5. Check browser - it updates automatically!

---

## STEP 4: Publish Your Changes (Deploy to Live Site)

Open a **new Terminal window** (keep the `npm run dev` one running):

```bash
cd Desktop/sigtrip-dashboard
git pull origin main        # Get any changes from others first
git add .
git commit -m "Update: changed target hotels to 5000"
git push origin main
```

✅ Done! Site will update in 2-3 minutes at:
`https://change101.github.io/sigtrip-dashboard/`

---

## Quick Commands Cheat Sheet

| Task | Command |
|------|---------|
| Start working | `npm run dev` |
| Get latest changes | `git pull origin main` |
| Save & deploy changes | `git add . && git commit -m "description" && git push origin main` |
| Check status | `git status` |

---

## What Each File Does

| File | What to Edit For |
|------|------------------|
| `src/hooks/useDashboard.ts` | Default numbers (salaries, hotels, etc.) |
| `src/components/Charts.tsx` | Chart colors, sizes, labels |
| `src/App.tsx` | Layout, what shows where |
| `src/lib/calculations.ts` | Math/formulas |

---

## Troubleshooting

**"Command not found: git"**
→ Install Git: https://git-scm.com/download

**"npm install fails"**
→ Make sure Node.js is installed: https://nodejs.org

**"Permission denied when pushing"**
→ Ask change101 to add you as collaborator on GitHub repo

**"My changes disappeared"**
→ Always run `git pull origin main` before making changes

---

## Need Help?

Ask change101 to check the GitHub Actions tab if deployment fails.
