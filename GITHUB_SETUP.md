# GitHub Setup Instructions

## Create Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner and select "New repository"
3. Fill in the repository details:
   - **Repository name**: `voice-analytics-dashboard`
   - **Description**: `A modern analytics dashboard for voice agents with customizable charts and Supabase integration`
   - **Public**: Yes (to share publicly)
   - **Initialize repository**: Do NOT check any options (we already have a local repo)

4. Click "Create repository"

## Push to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
cd d:\Projects\walnut\frontend

# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/voice-analytics-dashboard.git

# Rename branch to main (if needed)
git branch -M main

# Push the code
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Verify Push

1. Go to your repository on GitHub
2. You should see all your files and the README
3. The commit history should show your initial commit

## Add GitHub Secrets (For Deployment)

If deploying to Vercel/Netlify from GitHub:
1. Go to your repository Settings
2. Click "Secrets and variables" → "Actions"
3. Add the following secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

These will be available to your deployment pipeline.

## Update Repository Description

In GitHub repository settings, you can add:
- **About**: Brief description of the project
- **Website**: Link to deployed application (add after deployment)
- **Topics**: Add tags like `voice-ai`, `analytics`, `react`, `supabase`

## Enable GitHub Pages (Optional)

1. Go to Settings → Pages
2. Select "Deploy from a branch"
3. Select `main` branch and `/root` folder
4. Save

Note: This requires building the static site first with `npm run build`
