#!/usr/bin/env node

/**
 * Script to convert CSS file to TypeScript styles module
 * This ensures CSS is automatically bundled with the JS library
 */

const fs = require("fs");
const path = require("path");

const cssFilePath = path.join(__dirname, "../src/lib/SimplifyCaptcha.css");
const stylesFilePath = path.join(__dirname, "../src/lib/styles.ts");

function convertCssToTs() {
  try {
    // Read the CSS file
    const cssContent = fs.readFileSync(cssFilePath, "utf8");

    // Create the TypeScript file content
    const tsContent = `// Auto-generated styles for SimplifyCaptcha
export const captchaStyles = \`
${cssContent}
\`;

// Utility function to inject styles into document head
let stylesInjected = false;

export const injectStyles = (): void => {
  if (stylesInjected || typeof document === 'undefined') {
    return;
  }

  const styleElement = document.createElement('style');
  styleElement.id = 'simplify-captcha-styles';
  styleElement.textContent = captchaStyles;
  
  // Check if styles are already injected
  if (!document.getElementById('simplify-captcha-styles')) {
    document.head.appendChild(styleElement);
    stylesInjected = true;
  }
};`;

    // Write the TypeScript file
    fs.writeFileSync(stylesFilePath, tsContent);
    console.log("✅ Successfully converted CSS to TypeScript styles module");
    console.log(`📁 Generated: ${stylesFilePath}`);
  } catch (error) {
    console.error("❌ Error converting CSS to TypeScript:", error.message);
    process.exit(1);
  }
}

convertCssToTs();
