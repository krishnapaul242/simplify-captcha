import React, { useRef, useState, useEffect } from "react";
import { SimplifyCaptcha } from "../lib";
import type { SimplifyCaptchaRef } from "../lib";
import "./Demo.css";

const Demo: React.FC = () => {
  const captchaRef = useRef<SimplifyCaptchaRef>(null);
  const [interactionStats, setInteractionStats] = useState({
    mouseMovements: 0,
    clicks: 0,
    touches: 0,
    scrolls: 0,
    keystrokes: 0,
    deviceType: "unknown",
  });

  // Track user interactions for demo purposes
  useEffect(() => {
    let mouseCount = 0;
    let clickCount = 0;
    let touchCount = 0;
    let scrollCount = 0;
    let keystrokeCount = 0;
    let deviceType = "desktop";

    const updateStats = () => {
      setInteractionStats({
        mouseMovements: mouseCount,
        clicks: clickCount,
        touches: touchCount,
        scrolls: scrollCount,
        keystrokes: keystrokeCount,
        deviceType,
      });
    };

    const handleMouseMove = () => {
      mouseCount++;
      if (mouseCount % 10 === 0) updateStats(); // Update every 10 movements
    };

    const handleClick = () => {
      clickCount++;
      updateStats();
    };

    const handleTouch = () => {
      touchCount++;
      deviceType = "mobile";
      updateStats();
    };

    const handleScroll = () => {
      scrollCount++;
      if (scrollCount % 5 === 0) updateStats(); // Update every 5 scrolls
    };

    const handleKeyDown = () => {
      keystrokeCount++;
      updateStats();
    };

    // Add event listeners for demo tracking
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("touchstart", handleTouch, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("keydown", handleKeyDown, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleTouch);
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
          <h2>Real-time Gesture Tracking</h2>
          <div className="tracking-info">
            <div className="stat-item">
              <span className="stat-label">Device Type:</span>
              <span className="stat-value">{interactionStats.deviceType}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Mouse Movements:</span>
              <span className="stat-value">
                {interactionStats.mouseMovements}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Clicks:</span>
              <span className="stat-value">{interactionStats.clicks}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Touch Events:</span>
              <span className="stat-value">{interactionStats.touches}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Scroll Events:</span>
              <span className="stat-value">{interactionStats.scrolls}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Keystrokes:</span>
              <span className="stat-value">{interactionStats.keystrokes}</span>
            </div>
          </div>
          <p className="tracking-note">
            💡 The CAPTCHA analyzes these interactions to determine if you're
            human!
          </p>
        </div>

        <div className="demo-section">
          <h2>Features</h2>
          <ul>
            <li>🤖 Intelligent behavior analysis with real gesture tracking</li>
            <li>🖱️ Mouse movement pattern recognition</li>
            <li>👆 Touch gesture detection for mobile devices</li>
            <li>⌨️ Keyboard interaction timing analysis</li>
            <li>🔒 Text-based fallback verification</li>
            <li>📱 Responsive design</li>
            <li>🎨 Customizable styling with auto CSS injection</li>
            <li>⚡ TypeScript support</li>
            <li>🚀 Zero-config integration</li>
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
import { SimplifyCaptcha, SimplifyCaptchaRef } from 'simplify-captcha';

const MyComponent = () => {
  const captchaRef = useRef<SimplifyCaptchaRef>(null);

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
      <SimplifyCaptcha
        ref={captchaRef}
        onMessage={handleCaptchaResult}
      />
    </div>
  );
};`}
          </pre>
        </div>
      </div>

      <SimplifyCaptcha ref={captchaRef} onMessage={handleCaptchaMessage} />
    </div>
  );
};

export default Demo;
