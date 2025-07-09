# GitHub Pages Setup Guide

This guide will help you set up GitHub Pages for your SimplifyCaptcha documentation website.

## 🚀 Quick Setup

### 1. Enable GitHub Actions

1. Go to your GitHub repository
2. Click **Settings** tab
3. Navigate to **Actions** → **General**
4. Under **Actions permissions**, select:
   - ✅ **Allow all actions and reusable workflows**
5. Click **Save**

### 2. Configure GitHub Pages

1. In your repository settings, go to **Pages**
2. Under **Source**, select:
   - 📋 **GitHub Actions** (not "Deploy from a branch")
3. Click **Save**

### 3. Set Repository Permissions

1. Still in **Settings**, go to **Actions** → **General**
2. Scroll down to **Workflow permissions**
3. Select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

### 4. Push Your Code

```bash
git add .
git commit -m "Add documentation website"
git push origin main
```

### 5. Monitor Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow running called "Deploy Documentation to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once complete, your site will be available at:

   ```
   https://yourusername.github.io/simplify-captcha/
   ```

## 🔧 Advanced Configuration

### Custom Domain (Optional)

If you want to use a custom domain:

1. Create a `CNAME` file in the `docs/` directory:

   ```bash
   echo "your-domain.com" > docs/CNAME
   ```

2. Configure your domain's DNS:
   - Add a CNAME record pointing to `yourusername.github.io`

3. In GitHub repository settings → Pages:
   - Enter your custom domain
   - Enable "Enforce HTTPS"

### Branch Protection (Recommended)

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Set branch name pattern: `main`
4. Enable:
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Require deployments to succeed before merging**

## 📁 File Structure

After setup, your repository should have:

```
your-repo/
├── .github/
│   └── workflows/
│       └── deploy-docs.yml     # GitHub Actions workflow
├── docs/                       # Documentation website
│   ├── index.html             # Main page
│   ├── styles.css             # Styling
│   ├── script.js              # Interactive features
│   └── README.md              # Documentation guide
├── src/                       # Your library source
└── package.json
```

## 🔍 Troubleshooting

### ❌ Workflow Fails

**"Permission denied"**

- Check that workflow permissions are set to "Read and write"
- Ensure the GITHUB_TOKEN has proper permissions

**"Pages deployment failed"**

- Verify that Pages source is set to "GitHub Actions"
- Check that the workflow completed successfully

### ❌ Site Not Loading

**404 Error**

- Wait a few minutes for DNS propagation
- Check that the workflow deployed successfully
- Verify the repository is public (or you have GitHub Pro/Team for private repos)

**Broken Styling/JavaScript**

- Check browser console for errors
- Verify all files are in the `docs/` directory
- Ensure relative paths are correct

### ❌ Auto-deployment Not Working

**Pushes not triggering deployment**

- Check that the workflow file is in `.github/workflows/`
- Verify the branch name in the workflow matches your default branch
- Ensure Actions are enabled for the repository

## 🔄 Manual Deployment

If you need to deploy manually:

```bash
# Build the library
npm run build

# Commit any changes
git add .
git commit -m "Update documentation"

# Push to trigger deployment
git push origin main

# Or trigger manually from GitHub
# Go to Actions tab → "Deploy Documentation to GitHub Pages" → "Run workflow"
```

## 📊 Monitoring

### Analytics (Optional)

Add Google Analytics to track documentation usage:

1. Get your GA tracking ID
2. Add to `docs/index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Performance Monitoring

Monitor your documentation site:

- **PageSpeed Insights**: Test loading performance
- **GitHub Pages Usage**: Check in repository Insights
- **Search Console**: Monitor SEO and discoverability

## 🚀 Next Steps

After your documentation is live:

1. **Share the URL** in your README and npm package
2. **Update documentation** regularly with new features
3. **Monitor analytics** to understand user behavior
4. **Gather feedback** from users and improve content

## 💡 Tips

- The documentation auto-deploys on every push to main
- Test changes locally before pushing
- Use semantic commit messages for better tracking
- Keep documentation in sync with library updates
- Consider adding a staging environment for major changes

---

Need help? [Open an issue](https://github.com/krishnapaul242/simplify-captcha/issues) or check the [main documentation](https://krishnapaul242.github.io/simplify-captcha/).
