# Step-by-Step Guide: Upload Code to GitHub

This guide will walk you through uploading your RoboPhantoms website to GitHub.

## Prerequisites

- Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- A GitHub account ([Sign up](https://github.com/signup) if you don't have one)
- Terminal/Command Prompt access

---

## Step 1: Create a New Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `robophantoms-website` (or your preferred name)
   - **Description**: "Official website for RoboPhantoms FTC Team 23954"
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** check "Initialize with README", "Add .gitignore", or "Choose a license" (we already have these)
5. Click **"Create repository"**
6. **Copy the repository URL** that appears (it will look like: `https://github.com/yourusername/robophantoms-website.git`)

---

## Step 2: Open Terminal/Command Prompt

- **Mac/Linux**: Open Terminal
- **Windows**: Open Command Prompt or Git Bash

Navigate to your project directory:
```bash
cd "/Users/kamalakarthota/Downloads/RoboPhantoms copy"
```

---

## Step 3: Initialize Git Repository (if not already done)

```bash
git init
```

This creates a new Git repository in your project folder.

---

## Step 4: Add All Files to Git

Add all the files you want to upload:

```bash
# Add all files
git add .

# Verify what will be committed (optional)
git status
```

**Note**: The `.gitignore` file will automatically exclude development files like:
- `create_all_pages.py`
- `generate_pages.py`
- `index-single-page-backup.html`
- Documentation files (if you configured it that way)

---

## Step 5: Make Your First Commit

```bash
git commit -m "Initial commit: RoboPhantoms website"
```

This saves your files locally with a message describing the commit.

---

## Step 6: Connect to GitHub Repository

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Example:**
```bash
git remote add origin https://github.com/kamalakarthota/robophantoms-website.git
```

---

## Step 7: Rename Branch to Main (if needed)

```bash
git branch -M main
```

This ensures your branch is named "main" (GitHub's default).

---

## Step 8: Push Code to GitHub

```bash
git push -u origin main
```

You will be prompted to enter your GitHub credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your regular password)

### Creating a Personal Access Token (if needed):

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token (classic)"**
3. Give it a name (e.g., "RoboPhantoms Upload")
4. Select scopes: Check **"repo"** (full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## Step 9: Verify Upload

1. Go back to your GitHub repository page
2. Refresh the page
3. You should see all your files listed!

---

## Quick Reference: Complete Command Sequence

Here's all the commands in one block (replace YOUR_USERNAME and YOUR_REPO_NAME):

```bash
# Navigate to project directory
cd "/Users/kamalakarthota/Downloads/RoboPhantoms copy"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: RoboPhantoms website"

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Set branch name
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Files That Will Be Uploaded

Based on your `.gitignore`, the following will be uploaded:

✅ **Production Files:**
- 9 HTML pages (index.html, team.html, robot.html, etc.)
- styles.css
- script.js
- js/nav-footer.js
- All images (TeamPictures/, Coaches/, Robot/, Sponsors/)
- RoboPhantomLogo.png
- FtcFirstLogo.jpeg
- README.md
- .gitignore

❌ **Files Excluded (by .gitignore):**
- create_all_pages.py
- generate_pages.py
- index-single-page-backup.html
- Documentation files (PAGES_STRUCTURE.md, etc.)

---

## Troubleshooting

### Error: "remote origin already exists"
If you already added the remote, remove it first:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Error: "fatal: not a git repository"
Make sure you're in the project directory and run `git init` first.

### Error: Authentication failed
- Make sure you're using a Personal Access Token, not your password
- Check that your token has the "repo" scope enabled

### Error: "Permission denied"
- Verify your GitHub username is correct
- Make sure you have write access to the repository
- Check that the repository URL is correct

### Want to see what will be uploaded?
```bash
git status
```
This shows which files are staged (will be uploaded) and which are ignored.

---

## Next Steps After Upload

Once your code is on GitHub, you can:
1. **Deploy to Vercel** (connect your GitHub repository)
2. **Make updates**: Edit files, commit, and push changes
3. **Collaborate**: Invite team members to the repository
4. **Create branches**: Work on features without affecting the main site

---

## Updating Your Website (Future Changes)

When you make changes to your website:

```bash
# Add changed files
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

That's it! Your changes will be uploaded to GitHub.

