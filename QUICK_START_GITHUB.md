# Quick Start: Upload to GitHub

## One-Time Setup (First Time Only)

### 1. Create GitHub Repository
- Go to https://github.com/new
- Name: `robophantoms-website`
- Click "Create repository"
- Copy the repository URL

### 2. Run These Commands

```bash
cd "/Users/kamalakarthota/Downloads/RoboPhantoms copy"
git init
git add .
git commit -m "Initial commit: RoboPhantoms website"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` = Your GitHub username
- `YOUR_REPO_NAME` = Your repository name

### 3. Use Personal Access Token
- When prompted for password, use a Personal Access Token (not your password)
- Create token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token (classic)
- Select "repo" scope

---

## Future Updates (After Initial Upload)

```bash
git add .
git commit -m "Description of changes"
git push
```

---

📖 **Full detailed guide:** See `GITHUB_UPLOAD_GUIDE.md`

