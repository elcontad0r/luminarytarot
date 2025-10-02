# Deploying Your Tarot App to Vercel

## File Structure
Your project should look like this:
```
your-repo/
├── scientist-tarot-with-ai.html  (rename to index.html)
├── api/
│   └── generate-reading.js
└── vercel.json
```

## Setup Steps

### 1. Prep Your GitHub Repo
- Rename `scientist-tarot-with-ai.html` to `index.html`
- Create an `api` folder and put `generate-reading.js` inside it
- Add `vercel.json` to the root
- Push everything to GitHub

### 2. Sign up for Vercel
- Go to vercel.com
- Sign up with your GitHub account (it's free)

### 3. Import Your Project
- Click "Add New..." → "Project"
- Select your GitHub repository
- Vercel will auto-detect everything
- Click "Deploy"

### 4. Add Your API Key
- After deployment, go to your project dashboard
- Click "Settings" → "Environment Variables"
- Add a new variable:
  - Name: `ANTHROPIC_API_KEY`
  - Value: `your-actual-api-key-here`
- Click "Save"
- Redeploy (Vercel will prompt you)

### 5. Connect Your Domain
- Go to "Settings" → "Domains"
- Add your custom domain from Squarespace
- Vercel will give you DNS records to add in Squarespace
- In Squarespace: Settings → Domains → DNS Settings
- Add the CNAME record Vercel provides
- Wait 5-10 minutes for DNS propagation

## That's It!

Every time you push to GitHub, Vercel automatically redeploys. Your API key stays secure on the backend.

## Testing Locally (Optional)
If you want to test before deploying:
```bash
npm install -g vercel
vercel dev
```
Add a `.env.local` file with your API key:
```
ANTHROPIC_API_KEY=your-key-here
```

## Troubleshooting
- If readings don't work: Check that your API key is set in Vercel environment variables
- If the site doesn't load: Make sure `index.html` is in the root directory
- If API calls fail: Check the Vercel function logs under "Deployments" → your deployment → "Function Logs"
