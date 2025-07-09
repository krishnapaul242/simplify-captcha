# SimplifyCaptcha

A modern React CAPTCHA component library with advanced human verification capabilities. Originally adapted from React Native, this library provides intelligent behavior analysis and fallback text-based verification.

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
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
