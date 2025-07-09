# SimplifyCaptcha Documentation

This directory contains the documentation website for SimplifyCaptcha, which is automatically deployed to GitHub Pages.

## 🌐 Live Documentation

Visit the live documentation at: `https://krishnapaul242.github.io/simplify-captcha/`

## 📁 Structure

```text
docs/
├── index.html          # Main documentation page
├── styles.css          # Comprehensive styling
├── script.js           # Interactive demo functionality
└── README.md           # This file
```

## ✨ Features

### 📖 Comprehensive Documentation

- **Installation Guide**: Step-by-step setup instructions
- **API Reference**: Complete TypeScript interfaces and methods
- **Examples**: Real-world usage patterns and code samples
- **Feature Overview**: Detailed explanation of capabilities

### 🎮 Interactive Demo

- **Live Behavior Tracking**: Real-time interaction statistics
- **CAPTCHA Simulation**: Experience the verification process
- **Device Detection**: Shows mobile vs desktop behavior
- **Human Score**: Live calculation of behavior authenticity

### 🎨 Modern Design

- **Responsive Layout**: Works on all devices
- **Smooth Animations**: Engaging user experience
- **Code Highlighting**: Syntax highlighting for examples
- **Dark Mode Support**: Respects user preferences

## 🚀 Deployment

The documentation is automatically deployed to GitHub Pages using GitHub Actions:

1. **Trigger**: Pushes to `main` or `master` branch
2. **Build**: Compiles the library and prepares documentation
3. **Deploy**: Publishes to GitHub Pages

### Manual Deployment

To deploy manually:

```bash
# Build the library first
npm run build

# The GitHub Action will handle the rest automatically
git add .
git commit -m "Update documentation"
git push origin main
```

## 🛠️ Local Development

To work on the documentation locally:

1. **Start a local server** (any of these options):

   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

2. **Open your browser** to `http://localhost:8000`

3. **Edit files** in the `docs/` directory and refresh to see changes

## 📝 Content Guidelines

### Adding New Examples

To add a new code example:

1. Add the example to the `#examples` section in `index.html`
2. Use the existing `.example-card` structure
3. Include proper syntax highlighting with Prism.js classes

### Updating API Documentation

To update the API reference:

1. Modify the tables in the `#api` section
2. Ensure TypeScript types are accurate
3. Update any new props or methods

### Interactive Demo Updates

To enhance the demo functionality:

1. Edit `script.js` in the `initializeDemoControls()` function
2. Add new interaction tracking in `initializeInteractionTracking()`
3. Update the stats display in `updateStatsDisplay()`

## 🎯 Performance

The documentation is optimized for performance:

- **Minimal Dependencies**: Only Prism.js for syntax highlighting
- **Optimized CSS**: Efficient selectors and minimal repaints
- **Lazy Loading**: Images and heavy content load as needed
- **Caching**: Static assets are cached effectively

## 🔧 Configuration

### GitHub Pages Settings

Ensure these settings in your repository:

1. **Settings** → **Pages**
2. **Source**: GitHub Actions
3. **Custom Domain**: Optional

### SEO and Meta Tags

The documentation includes:

- Open Graph tags for social sharing
- Proper meta descriptions
- Structured data for search engines
- Semantic HTML for accessibility

## 🚨 Troubleshooting

### Common Issues

**GitHub Pages not updating:**

- Check the Actions tab for build errors
- Ensure the workflow has proper permissions
- Verify the branch name in the workflow

**Local development issues:**

- Use a proper HTTP server (not file:// protocol)
- Check browser console for JavaScript errors
- Ensure all files are properly linked

**Interactive demo not working:**

- Check for JavaScript errors in browser console
- Verify event listeners are properly attached
- Ensure DOM elements exist before accessing them

## 🤝 Contributing

To contribute to the documentation:

1. Fork the repository
2. Create a feature branch
3. Make your changes in the `docs/` directory
4. Test locally
5. Submit a pull request

## 📄 License

This documentation is part of SimplifyCaptcha and is licensed under the MIT License.

---

For more information about the SimplifyCaptcha library itself, see the main [README.md](../README.md) in the project root.
