# Quick GitHub Pages Setup

## Enable GitHub Pages in 3 steps

### 1. Repository Settings

- Go to Settings → Actions → General
- Enable "Allow all actions and reusable workflows"
- Set workflow permissions to "Read and write permissions"

### 2. Enable Pages

- Go to Settings → Pages
- Set Source to "GitHub Actions"

### 3. Deploy

```bash
git add .
git commit -m "Add documentation website"
git push origin main
```

Your documentation will be available at:
`https://yourusername.github.io/simplify-captcha/`

For detailed setup instructions, see [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)
