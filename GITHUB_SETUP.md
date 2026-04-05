# GitHub Setup Guide - Rescue Routes

This guide will help you push your Rescue Routes project to GitHub.

---

## Prerequisites

- Git installed on your computer
- GitHub account created
- Your project is ready to push

---

## Step-by-Step Guide

### Step 1: Initialize Git Repository (if not already done)

Open your terminal in the project directory and run:

```bash
git init
```

### Step 2: Check Git Status

See what files will be committed:

```bash
git status
```

**Important:** Make sure `.env.local` is NOT listed (it should be ignored by `.gitignore`)

### Step 3: Add All Files to Git

```bash
git add .
```

### Step 4: Create Your First Commit

```bash
git commit -m "Initial commit: Rescue Routes NGO platform"
```

### Step 5: Create a New Repository on GitHub

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `rescue-routes` (or your preferred name)
3. Description: "Animal welfare NGO platform with volunteer management, donations, campaigns, and merchandise store"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 6: Connect Your Local Repository to GitHub

GitHub will show you commands. Use these (replace with your actual repository URL):

```bash
git remote add origin https://github.com/YOUR_USERNAME/rescue-routes.git
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/satyapaljanghela/rescue-routes.git
git branch -M main
git push -u origin main
```

### Step 7: Enter Your GitHub Credentials

When prompted:
- Username: Your GitHub username
- Password: Your GitHub Personal Access Token (not your account password)

**How to create a Personal Access Token:**
1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Rescue Routes"
4. Select scopes: Check **"repo"** (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when pushing

---

## Verify Your Push

1. Go to your GitHub repository URL
2. You should see all your files
3. Verify that `.env.local` is **NOT** visible (it should be ignored)
4. Check that `.env.example` **IS** visible

---

## Future Updates

After making changes to your code:

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "Add feature: order tracking system"

# Push to GitHub
git push
```

---

## Common Git Commands

```bash
# Check current status
git status

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes from GitHub
git pull

# View remote repository URL
git remote -v
```

---

## Important Security Notes

✅ **What IS pushed to GitHub:**
- All source code files
- `.env.example` (template without secrets)
- Documentation files
- Configuration files

❌ **What is NOT pushed (protected by .gitignore):**
- `.env.local` (contains your secrets)
- `node_modules/` (dependencies)
- `.next/` (build files)
- Other sensitive files

---

## Setting Up on Another Computer

When someone clones your repository:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/rescue-routes.git

# Navigate to the project
cd rescue-routes

# Install dependencies
npm install

# Copy the example env file
cp .env.example .env.local

# Edit .env.local with actual values
# (MongoDB URI, Razorpay keys, email credentials)

# Run the development server
npm run dev
```

---

## Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/rescue-routes.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --rebase
git push origin main
```

### Error: "Authentication failed"
- Make sure you're using a Personal Access Token, not your password
- Generate a new token if needed

### Want to undo last commit (before pushing)
```bash
git reset --soft HEAD~1
```

---

## Best Practices

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Describe what changed and why
3. **Pull Before Push**: Always pull latest changes before pushing
4. **Use Branches**: Create feature branches for new features
5. **Review Changes**: Use `git diff` to review changes before committing
6. **Never Commit Secrets**: Double-check `.env.local` is not committed

---

## Example Commit Messages

Good commit messages:
```
✅ "Add order tracking with delivery status updates"
✅ "Fix: Resolve payment verification issue in Razorpay"
✅ "Update: Improve mobile responsiveness for store page"
✅ "Feature: Add organization carousel to landing page"
```

Bad commit messages:
```
❌ "update"
❌ "fix bug"
❌ "changes"
❌ "asdfasdf"
```

---

## Next Steps After Pushing

1. ✅ Add a README.md with project description
2. ✅ Add screenshots to showcase your project
3. ✅ Set up GitHub Actions for CI/CD (optional)
4. ✅ Deploy to Vercel or other hosting platform
5. ✅ Share your repository link

---

**Congratulations!** Your project is now on GitHub! 🎉
