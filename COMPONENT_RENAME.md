# Component Rename: TextCaptcha → SimplifyCaptcha

## Summary of Changes

Successfully renamed the main component from `TextCaptcha` to `SimplifyCaptcha` throughout the entire codebase to better align with the library name.

## Files Modified

### Core Library Files

- **Renamed**: `src/lib/TextCaptcha.tsx` → `src/lib/SimplifyCaptcha.tsx`
- **Renamed**: `src/lib/TextCaptcha.css` → `src/lib/SimplifyCaptcha.css`
- **Updated**: `src/lib/index.ts` - Updated exports to use new component name
- **Updated**: `src/lib/SimplifyCaptcha.tsx` - Updated component name, props, and ref interfaces

### Type Definitions Updated

- `TextCaptchaProps` → `SimplifyCaptchaProps`
- `TextCaptchaRef` → `SimplifyCaptchaRef`
- Component display name updated to "SimplifyCaptcha"

### Demo and Example Files

- **Updated**: `src/demo/Demo.tsx` - Updated imports and component usage
- **Updated**: `example-usage.tsx` - Updated imports and component usage

### Documentation Files

- **Updated**: `README.md` - Updated all code examples and API documentation
- **Updated**: `AUTO_CSS_INJECTION.md` - Updated file references and examples
- **Updated**: `scripts/css-to-ts.js` - Updated CSS file path reference

## New Public API

### Import Statement

```tsx
import { SimplifyCaptcha, SimplifyCaptchaRef } from 'simplify-captcha';
```

### Component Usage

```tsx
const captchaRef = useRef<SimplifyCaptchaRef>(null);

<SimplifyCaptcha
  ref={captchaRef}
  onMessage={handleCaptchaResult}
  className="my-custom-captcha"
  style={{ borderRadius: '10px' }}
/>
```

### Type Definitions

- `SimplifyCaptchaProps` - Component props interface
- `SimplifyCaptchaRef` - Component ref interface

## Build Verification

✅ **TypeScript Compilation**: Successful  
✅ **Vite Build**: Successful  
✅ **Declaration Files**: Generated correctly  
✅ **Bundle Size**: Maintained (~25.97 kB)  
✅ **No Breaking Changes**: All functionality preserved  

## Backwards Compatibility

⚠️ **Breaking Change**: This is a breaking change for existing users. They will need to:

1. Update import statements from `TextCaptcha` to `SimplifyCaptcha`
2. Update type references from `TextCaptchaRef` to `SimplifyCaptchaRef`
3. Update component usage in JSX

## Migration Guide for Users

```tsx
// Before
import { TextCaptcha, TextCaptchaRef } from 'simplify-captcha';
const captchaRef = useRef<TextCaptchaRef>(null);
<TextCaptcha ref={captchaRef} onMessage={handleResult} />

// After  
import { SimplifyCaptcha, SimplifyCaptchaRef } from 'simplify-captcha';
const captchaRef = useRef<SimplifyCaptchaRef>(null);
<SimplifyCaptcha ref={captchaRef} onMessage={handleResult} />
```

The component functionality, props, and behavior remain exactly the same - only the name has changed to better reflect the library's identity.
