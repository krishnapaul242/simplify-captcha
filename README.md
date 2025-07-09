# SimplifyCaptcha

A modern React CAPTCHA component library with advanced human verification capabilities. Originally adapted from React Native, this library provides intelligent behavior analysis and fallback text-based verification.

## Features

- 🤖 **Intelligent Behavior Analysis** - Automatically detects human-like interaction patterns
- 🔒 **Text-based Fallback** - Traditional CAPTCHA when automatic verification fails
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Customizable Styling** - Easy to customize with CSS classes and inline styles
- ⚡ **TypeScript Support** - Full TypeScript definitions included
- 🚀 **Easy Integration** - Simple API with ref-based control

## Installation

```bash
npm install simplify-captcha
```

## Quick Start

```tsx
import React, { useRef } from 'react';
import { TextCaptcha, TextCaptchaRef } from 'simplify-captcha';

function MyComponent() {
  const captchaRef = useRef<TextCaptchaRef>(null);

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
      
      <TextCaptcha
        ref={captchaRef}
        onMessage={handleCaptchaResult}
      />
    </div>
  );
}
```

## API Reference

### TextCaptcha Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onMessage` | `(event: { nativeEvent: { data: string } }) => void` | Yes | Callback for verification results |
| `style` | `React.CSSProperties` | No | Custom inline styles |
| `className` | `string` | No | Custom CSS class name |

### TextCaptchaRef Methods

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

1. **Background Analysis**: The component continuously analyzes user interaction patterns from the moment it mounts
2. **Intelligent Scoring**: Based on factors like time spent, interaction patterns, and natural behavior indicators
3. **Automatic Verification**: If the human score is high enough (≥80%), verification passes automatically
4. **Fallback CAPTCHA**: If automatic verification fails, a traditional text-based CAPTCHA is presented
5. **Multiple Attempts**: Users get up to 30 attempts to solve the text CAPTCHA

## Customization

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
<TextCaptcha
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
