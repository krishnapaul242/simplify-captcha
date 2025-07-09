// Auto-generated styles for SimplifyCaptcha
export const captchaStyles = `
/* SimplifyCaptcha Styles */

.sc-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  z-index: 9999;
}

.sc-container {
  background-color: #1a1a1a;
  border-radius: 15px;
  padding: 20px;
  width: 85%;
  max-width: 400px;
  border: 1px solid #48d1cc;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.sc-text-captcha-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.sc-title {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 8px;
  text-align: center;
}

.sc-subtitle {
  font-size: 14px;
  color: #b0b0b0;
  margin-bottom: 20px;
  text-align: center;
}

.sc-captcha-container {
  margin-bottom: 20px;
  position: relative;
}

.sc-captcha-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.sc-captcha-text {
  font-family: 'Courier New', monospace;
  font-size: 28px;
  font-weight: bold;
  color: #48d1cc;
  text-decoration: line-through;
  letter-spacing: 8px;
  text-align: center;
  user-select: none;
  background: linear-gradient(45deg, #48d1cc, #20b2aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex: 1;
  padding: 10px 0;
}

.sc-refresh-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.sc-refresh-button:hover {
  background-color: rgba(72, 209, 204, 0.1);
}

.sc-refresh-button:active {
  transform: scale(0.95);
}

.sc-input-section {
  margin-bottom: 20px;
}

.sc-input-label {
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 8px;
  display: block;
}

.sc-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #333;
  border-radius: 8px;
  background-color: #2a2a2a;
  color: #ffffff;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.sc-input:focus {
  outline: none;
  border-color: #48d1cc;
}

.sc-button-container {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.sc-button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s, transform 0.1s;
}

.sc-button:active {
  transform: scale(0.98);
}

.sc-verify-button {
  background-color: #48d1cc;
  color: #000000;
}

.sc-verify-button:hover {
  background-color: #40c7c4;
}

.sc-verify-button:disabled {
  background-color: #666;
  color: #999;
  cursor: not-allowed;
}

.sc-verify-button:disabled:hover {
  background-color: #666;
}

.sc-cancel-button {
  background-color: #666;
  color: #ffffff;
}

.sc-cancel-button:hover {
  background-color: #777;
}

.sc-attempts-text {
  font-size: 12px;
  color: #ff6b6b;
  text-align: center;
  margin-top: 10px;
}

/* Animation classes */
.sc-fade-in {
  animation: scFadeIn 0.3s ease-out;
}

.sc-fade-out {
  animation: scFadeOut 0.3s ease-in;
}

@keyframes scFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scFadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}

/* Responsive design */
@media (max-width: 480px) {
  .sc-container {
    width: 95%;
    padding: 15px;
  }

  .sc-title {
    font-size: 16px;
  }

  .sc-captcha-text {
    font-size: 24px;
    letter-spacing: 6px;
  }

  .sc-input {
    font-size: 14px;
    padding: 10px;
  }

  .sc-button {
    padding: 8px 16px;
    font-size: 13px;
  }
}

/* Accessibility improvements */
.sc-button:focus,
.sc-input:focus,
.sc-refresh-button:focus {
  outline: 2px solid #48d1cc;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .sc-container {
    border: 2px solid #48d1cc;
  }

  .sc-captcha-text {
    -webkit-text-fill-color: #48d1cc;
    color: #48d1cc;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .sc-fade-in,
  .sc-fade-out {
    animation: none;
  }

  .sc-button,
  .sc-refresh-button {
    transition: none;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: light) {
  .sc-overlay {
    background-color: rgba(255, 255, 255, 0.9);
  }

  .sc-container {
    background-color: #ffffff;
    border: 1px solid #48d1cc;
    color: #000000;
  }

  .sc-title {
    color: #000000;
  }

  .sc-subtitle {
    color: #666666;
  }

  .sc-input-label {
    color: #000000;
  }

  .sc-input {
    background-color: #f5f5f5;
    border: 2px solid #ddd;
    color: #000000;
  }

  .sc-cancel-button {
    background-color: #e0e0e0;
    color: #000000;
  }

  .sc-cancel-button:hover {
    background-color: #d0d0d0;
  }
}

/* Print styles */
@media print {
  .sc-overlay {
    display: none !important;
  }
}
`;

// Utility function to inject styles into document head
let stylesInjected = false;

export const injectStyles = (): void => {
  if (stylesInjected || typeof document === "undefined") {
    return;
  }

  const styleElement = document.createElement("style");
  styleElement.id = "simplify-captcha-styles";
  styleElement.textContent = captchaStyles;

  // Check if styles are already injected
  if (!document.getElementById("simplify-captcha-styles")) {
    document.head.appendChild(styleElement);
    stylesInjected = true;
  }
};
