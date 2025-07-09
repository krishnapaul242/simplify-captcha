# SimplifyCaptcha

A modern React CAPTCHA component library with advanced human verification capabilities. Originally adapted from React Native, this library provides intelligent behavior analysis and fallback text-based verification.

## 📖 Documentation

**[View Full Documentation →](https://krishnapaul242.github.io/simplify-captcha/)**

The complete documentation includes:

- 🎮 **Interactive Demo** - Test the component with live behavior tracking
- 📋 **Comprehensive API Reference** - Complete TypeScript interfaces
- 💻 **Code Examples** - Real-world usage patterns
- 🚀 **Installation Guide** - Step-by-step setup instructions

## Features

- 🤖 **Intelligent Behavior Analysis** - Advanced real-time gesture and interaction tracking
- 🖱️ **Mouse Movement Tracking** - Analyzes cursor patterns, velocity, and natural variations
- 👆 **Touch Gesture Recognition** - Detects multi-touch gestures and natural mobile interactions  
- ⌨️ **Keyboard Pattern Analysis** - Monitors typing rhythm and natural keystroke variations
- 📜 **Scroll Behavior Monitoring** - Tracks natural scrolling patterns and content engagement
- 🔒 **Text-based Fallback** - Traditional CAPTCHA when automatic verification fails
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Customizable Styling** - Easy to customize with CSS classes and inline styles
- ⚡ **TypeScript Support** - Full TypeScript definitions included
- 🚀 **Easy Integration** - Simple API with ref-based control
- 🎯 **Zero CSS Imports** - Styles are automatically injected, no separate CSS imports needed
- 📈 **Automatic Version Bumping** - Intelligent semantic versioning based on change analysis

## Installation

```bash
npm install simplify-captcha
```

**Note**: No CSS imports are required! The component automatically injects its styles when used.

The library exports the following TypeScript types:

- `SimplifyCaptcha` - The main CAPTCHA component
- `SimplifyCaptchaProps` - Props interface for the component  
- `SimplifyCaptchaRef` - Ref interface for imperative methods
- `injectStyles` - Utility function for manual style injection

## Quick Start

```tsx
import React, { useRef } from 'react';
import { SimplifyCaptcha, SimplifyCaptchaRef } from 'simplify-captcha';

function MyComponent() {
  const captchaRef = useRef<SimplifyCaptchaRef>(null);

  const handleCaptchaResult = (event: { nativeEvent: { data: string } }) => {
    const { data } = event.nativeEvent;
    
    switch (data) {
      case 'verified':
        console.log('✅ User verified successfully!');
        break;
      case 'cancel':
        console.log('❌ User cancelled verification');
        break;
      case 'error':
        console.log('❌ Verification failed - too many attempts');
        break;
    }
  };

  return (
    <div>
      <button onClick={() => captchaRef.current?.show()}>
        Verify I'm Human
      </button>
      
      <SimplifyCaptcha
        ref={captchaRef}
        onMessage={handleCaptchaResult}
      />
    </div>
  );
}
```

## API Reference

### SimplifyCaptcha Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onMessage` | `(event: { nativeEvent: { data: string } }) => void` | Yes | Callback for verification results |
| `style` | `React.CSSProperties` | No | Custom inline styles |
| `className` | `string` | No | Custom CSS class name |

### SimplifyCaptchaRef Methods

| Method | Description |
|--------|-------------|
| `show()` | Displays the CAPTCHA modal |
| `hide()` | Hides the CAPTCHA modal |

### Verification Results

The `onMessage` callback receives these possible results:

- `'verified'` - User passed verification
- `'cancel'` - User cancelled the verification process
- `'error'` - Verification failed due to too many incorrect attempts

## How It Works

1. **Real-Time Gesture Analysis**: The component continuously monitors user interactions including:
   - **Mouse movements**: Cursor patterns, velocity changes, and natural variations
   - **Touch gestures**: Multi-touch events, swipe patterns, and pressure sensitivity
   - **Keyboard interactions**: Typing rhythm, keystroke timing, and natural variations
   - **Scroll behavior**: Scrolling patterns indicating natural content consumption

2. **Device-Adaptive Scoring**: Automatically detects device capabilities and adjusts scoring:
   - **Desktop**: Focuses on mouse movement patterns and click behaviors
   - **Mobile**: Emphasizes touch gestures and natural finger interactions
   - **Cross-platform**: Adapts to device pixel ratio and input capabilities

3. **Intelligent Human Detection**: Advanced algorithm analyzes multiple factors:
   - Time spent on page and interaction frequency
   - Natural timing variations in user actions
   - Device-appropriate interaction patterns
   - Behavioral consistency and human-like randomness

4. **Automatic Verification**: If the human score is high enough (≥80%), verification passes automatically

5. **Fallback CAPTCHA**: If automatic verification fails, a traditional text-based CAPTCHA is presented

6. **Multiple Attempts**: Users get up to 30 attempts to solve the text CAPTCHA

## Customization

### Automatic Style Injection

The library automatically injects CSS styles when the component is used. This means:

- ✅ **No CSS imports needed** - Just import the component and it works
- ✅ **No build configuration required** - Styles are bundled with the JavaScript
- ✅ **No style conflicts** - Styles are scoped with `sc-` prefix
- ✅ **SSR compatible** - Only injects styles on the client side

If you need manual control over style injection:

```tsx
import { injectStyles } from 'simplify-captcha';

// Manually inject styles (optional - happens automatically)
injectStyles();
```

### Styling

The component uses CSS classes with the `sc-` prefix. You can override these styles:

```css
/* Override the overlay background */
.sc-overlay {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Customize the container */
.sc-container {
  border-color: #your-color;
  background-color: #your-background;
}

/* Style the submit button */
.sc-submit-button {
  background-color: #your-primary-color;
}
```

### Custom Styling with Props

```tsx
<SimplifyCaptcha
  ref={captchaRef}
  onMessage={handleCaptchaResult}
  className="my-custom-captcha"
  style={{ 
    borderColor: '#ff6b6b',
    backgroundColor: '#2c3e50' 
  }}
/>
```

## Development

```bash
# Install dependencies
npm install

# Start development server with demo
npm run dev

# Build the library
npm run build

# Build library only
npm run build:lib

# Serve documentation locally
npm run serve:docs
```

## 📖 Documentation Development

To work on the documentation:

1. **Local Testing**: Run `npm run serve:docs` or use the quick-start scripts:
   - Linux/Mac: `./quick-start.sh`
   - Windows: `quick-start.bat`

2. **GitHub Pages Setup**: See [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) for detailed deployment instructions

3. **Documentation Files**:
   - `docs/index.html` - Main documentation page
   - `docs/styles.css` - Styling
   - `docs/script.js` - Interactive demo functionality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please follow these guidelines:

### 🐛 Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/environment details
- Minimal code example

### 💡 Feature Requests

For new features:

- Explain the use case and benefit
- Provide examples of how it would be used
- Consider backward compatibility

### 🔧 Code Contributions

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Install** dependencies: `npm install`
4. **Make** your changes
5. **Test** locally: `npm run dev` and `npm run serve:docs`
6. **Build** to ensure no errors: `npm run build`
7. **Commit** with clear messages: `git commit -m 'Add amazing feature'`
8. **Push** to your branch: `git push origin feature/amazing-feature`
9. **Create** a Pull Request

### 📖 Documentation Contributions

For documentation updates:

- Edit files in the `docs/` directory
- Test locally with `npm run serve:docs`
- Ensure responsive design works on mobile
- Update code examples if needed
- Check that interactive demo still functions

### 🧪 Testing Guidelines

- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Verify both desktop and mobile experiences
- Ensure the behavior analysis works correctly
- Test the fallback text CAPTCHA functionality

### 📝 Code Style

- Follow existing TypeScript patterns
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Maintain backward compatibility when possible

Thank you for contributing to SimplifyCaptcha! 🎉
