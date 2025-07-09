import React, { useRef } from "react";
import { TextCaptcha } from "../lib";
import type { TextCaptchaRef } from "../lib";
import "./Demo.css";

const Demo: React.FC = () => {
  const captchaRef = useRef<TextCaptchaRef>(null);

  const handleCaptchaMessage = (event: { nativeEvent: { data: string } }) => {
    const { data } = event.nativeEvent;
    console.log("Captcha result:", data);

    switch (data) {
      case "verified":
        alert("✅ Verification successful! You are verified as human.");
        break;
      case "cancel":
        alert("❌ Verification cancelled.");
        break;
      case "error":
        alert("❌ Verification failed. Too many attempts.");
        break;
      default:
        console.log("Unknown captcha result:", data);
    }
  };

  const showCaptcha = () => {
    captchaRef.current?.show();
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>SimplifyCaptcha Demo</h1>
        <p>A modern React CAPTCHA component with advanced human verification</p>
      </div>

      <div className="demo-content">
        <div className="demo-section">
          <h2>Features</h2>
          <ul>
            <li>🤖 Intelligent behavior analysis</li>
            <li>🔒 Text-based fallback verification</li>
            <li>📱 Responsive design</li>
            <li>🎨 Customizable styling</li>
            <li>⚡ TypeScript support</li>
            <li>🚀 Easy integration</li>
          </ul>
        </div>

        <div className="demo-section">
          <h2>Try it out</h2>
          <p>Click the button below to test the CAPTCHA component:</p>
          <button className="demo-button" onClick={showCaptcha}>
            Show CAPTCHA
          </button>
        </div>

        <div className="demo-section">
          <h2>How it works</h2>
          <ol>
            <li>
              The component analyzes user interaction patterns in the background
            </li>
            <li>
              If natural human behavior is detected, verification passes
              automatically
            </li>
            <li>
              Otherwise, a text-based CAPTCHA is shown for additional
              verification
            </li>
            <li>
              The component provides callbacks for different verification states
            </li>
          </ol>
        </div>

        <div className="demo-section">
          <h2>Usage Example</h2>
          <pre className="code-block">
            {`import React, { useRef } from 'react';
import { TextCaptcha, TextCaptchaRef } from 'simplify-captcha';

const MyComponent = () => {
  const captchaRef = useRef<TextCaptchaRef>(null);

  const handleCaptchaResult = (event) => {
    const { data } = event.nativeEvent;
    if (data === 'verified') {
      console.log('User verified!');
    }
  };

  return (
    <div>
      <button onClick={() => captchaRef.current?.show()}>
        Verify Human
      </button>
      <TextCaptcha
        ref={captchaRef}
        onMessage={handleCaptchaResult}
      />
    </div>
  );
};`}
          </pre>
        </div>
      </div>

      <TextCaptcha ref={captchaRef} onMessage={handleCaptchaMessage} />
    </div>
  );
};

export default Demo;
