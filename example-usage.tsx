// Example of how to use simplify-captcha in another project
// This demonstrates advanced gesture tracking with NO CSS imports needed!

import React, { useRef } from "react";
import { SimplifyCaptcha, SimplifyCaptchaRef } from "simplify-captcha";
// Notice: NO CSS import required! ✨

function ExampleUsage() {
  const captchaRef = useRef<SimplifyCaptchaRef>(null);

  const handleCaptchaResult = (event: { nativeEvent: { data: string } }) => {
    const { data } = event.nativeEvent;

    switch (data) {
      case "verified":
        console.log("✅ User verified successfully!");
        console.log(
          "The CAPTCHA analyzed their interactions and determined they are human"
        );
        // Proceed with form submission or protected action
        break;
      case "cancel":
        console.log("❌ User cancelled verification");
        break;
      case "error":
        console.log("❌ Verification failed - too many attempts");
        break;
    }
  };

  return (
    <div>
      <h1>My App with Advanced CAPTCHA</h1>
      <p>Move your mouse, scroll, and interact naturally with the page!</p>
      <p>The CAPTCHA is learning about your interaction patterns...</p>

      <div style={{ padding: "20px", marginBottom: "20px" }}>
        <p>Try these interactions to improve your human score:</p>
        <ul>
          <li>🖱️ Move your mouse naturally around the page</li>
          <li>📜 Scroll up and down</li>
          <li>👆 On mobile: use touch gestures</li>
          <li>
            ⌨️ Type something in this input:{" "}
            <input placeholder="Type here..." />
          </li>
          <li>🖱️ Click around the page a few times</li>
        </ul>
      </div>

      <button
        onClick={() => captchaRef.current?.show()}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#48d1cc",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🤖 Verify I'm Human
      </button>

      {/* 
        The SimplifyCaptcha component automatically:
        1. Injects its styles (no CSS import needed)
        2. Tracks mouse movements, touches, scrolls, clicks, and keystrokes
        3. Analyzes patterns to determine if user is human
        4. Shows fallback text CAPTCHA if needed
      */}
      <SimplifyCaptcha
        ref={captchaRef}
        onMessage={handleCaptchaResult}
        className="my-custom-captcha" // Optional: add your own CSS class
        style={{ borderRadius: "10px" }} // Optional: inline styles
      />
    </div>
  );
}

export default ExampleUsage;
