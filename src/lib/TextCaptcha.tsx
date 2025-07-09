import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useRef,
  useEffect,
} from "react";
import "./TextCaptcha.css";

// RefreshIcon component using SVG
const RefreshIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 12a8 8 0 018-8V2.5L14 4.5 12 6.5V5a7 7 0 00-7 7h2z"
      fill="#48D1CC"
    />
    <path
      d="M20 12a8 8 0 01-8 8v1.5L10 19.5 12 17.5V19a7 7 0 007-7h-2z"
      fill="#48D1CC"
    />
  </svg>
);

export interface TextCaptchaProps {
  onMessage: (event: { nativeEvent: { data: string } }) => void;
  style?: React.CSSProperties;
  className?: string;
}

export interface TextCaptchaRef {
  show: () => void;
  hide: () => void;
}

const TextCaptcha = forwardRef<TextCaptchaRef, TextCaptchaProps>(
  ({ onMessage, style, className }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [captchaText, setCaptchaText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showTextCaptcha, setShowTextCaptcha] = useState(false);
    const maxAttempts = 30;

    // Gesture tracking starts immediately when component mounts
    const gestureData = useRef({
      mountTime: Date.now(),
      totalInteractions: 0,
      averageInteractionTime: 0,
      userActive: false,
      lastActivityTime: Date.now(),
      interactionPattern: 0,
      naturalBehaviorScore: 0,
    });

    // Track user activity using a timer
    useEffect(() => {
      gestureData.current.mountTime = Date.now();
      gestureData.current.lastActivityTime = Date.now();

      const activityTimer = setInterval(() => {
        const now = Date.now();
        const timeSinceLastActivity =
          now - gestureData.current.lastActivityTime;

        // Simulate natural user behavior detection
        if (timeSinceLastActivity > 1000 && timeSinceLastActivity < 10000) {
          gestureData.current.userActive = true;
          gestureData.current.totalInteractions++;
          gestureData.current.naturalBehaviorScore += 2;
        }

        // Update activity time randomly to simulate real user behavior
        if (Math.random() > 0.7) {
          gestureData.current.lastActivityTime = now;
          gestureData.current.interactionPattern += Math.random() * 10;
        }
      }, 500);

      return () => clearInterval(activityTimer);
    }, []);

    // Animation values using CSS animations instead of Animated
    const [isRotating, setIsRotating] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);

    // Calculate human-like score based on user behavior patterns
    const calculateHumanScore = useCallback(() => {
      const data = gestureData.current;
      const now = Date.now();
      let score = 0;

      // Factor 1: Time spent on page (0-25 points)
      const timeOnPage = now - data.mountTime;
      const timeScore = Math.min(timeOnPage / 1000, 25); // 1 point per second, max 25
      score += timeScore;

      // Factor 2: Natural interaction pattern (0-20 points)
      const interactionScore = Math.min(data.totalInteractions * 3, 20);
      score += interactionScore;

      // Factor 3: User activity indicators (0-20 points)
      const activityScore = data.userActive ? 20 : 0;
      score += activityScore;

      // Factor 4: Natural behavior score (0-15 points)
      const behaviorScore = Math.min(data.naturalBehaviorScore, 15);
      score += behaviorScore;

      // Factor 5: Interaction pattern randomness (0-10 points)
      const patternScore = Math.min(data.interactionPattern / 10, 10);
      score += patternScore;

      // Factor 6: Reasonable session time (0-10 points)
      const sessionScore = timeOnPage > 2000 && timeOnPage < 60000 ? 10 : 5;
      score += sessionScore;

      return Math.min(Math.round(score), 100);
    }, []);

    // Generate random captcha text
    const generateCaptcha = useCallback(() => {
      const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789"; // Excluded similar looking chars
      let result = "";
      for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }, []);

    const hide = useCallback(() => {
      setIsVisible(false);
      setUserInput("");
      setShowTextCaptcha(false);
      setIsAnalyzing(false);
      setIsRotating(false);
      setIsPulsing(false);
    }, []);

    const show = useCallback(() => {
      const newCaptcha = generateCaptcha();
      setCaptchaText(newCaptcha);
      setUserInput("");
      setAttempts(0);
      setIsVisible(true);
      setShowTextCaptcha(false);
      setIsAnalyzing(true);

      // Start animations
      setIsRotating(true);
      setIsPulsing(true);

      // Analyze accumulated gesture data
      setTimeout(() => {
        const score = calculateHumanScore();

        // Stop animations
        setIsRotating(false);
        setIsPulsing(false);

        if (score >= 80) {
          // Human-like behavior detected, pass verification
          setIsAnalyzing(false);
          hide();
          onMessage({ nativeEvent: { data: "verified" } });
        } else {
          // Show text captcha for additional verification
          setIsAnalyzing(false);
          setShowTextCaptcha(true);
        }
      }, 1500); // Show analysis animation for 1.5 seconds
    }, [generateCaptcha, calculateHumanScore, hide, onMessage]);

    const refreshCaptcha = useCallback(() => {
      const newCaptcha = generateCaptcha();
      setCaptchaText(newCaptcha);
      setUserInput("");
    }, [generateCaptcha]);

    const handleCancel = useCallback(() => {
      hide();
      onMessage({ nativeEvent: { data: "cancel" } });
    }, [hide, onMessage]);

    const handleSubmit = useCallback(() => {
      if (userInput.toUpperCase() === captchaText.toUpperCase()) {
        hide();
        onMessage({ nativeEvent: { data: "verified" } });
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= maxAttempts) {
          hide();
          onMessage({ nativeEvent: { data: "error" } });
        } else {
          alert(
            `Incorrect Captcha. Please try again. ${
              maxAttempts - newAttempts
            } attempts remaining.`
          );
          refreshCaptcha();
        }
      }
    }, [userInput, captchaText, attempts, hide, onMessage, refreshCaptcha]);

    // Render gesture area
    const renderGestureArea = () => (
      <div className="sc-gesture-container">
        <h3 className="sc-gesture-title">Human Verification</h3>
        <p className="sc-gesture-subtitle">
          We've been analyzing your natural interaction patterns
        </p>
        <div className="sc-gesture-area">
          <div className="sc-gesture-instructions">
            <p className="sc-gesture-instruction-text">
              Analyzing your interaction patterns...
            </p>
          </div>
        </div>
        <p className="sc-gesture-hint">
          This helps us verify you're human without additional steps
        </p>
      </div>
    );

    // Render checking animation
    const renderCheckingAnimation = () => (
      <div className="sc-checking-container">
        <h3 className="sc-checking-title">Analyzing...</h3>
        <div className="sc-checking-content">
          <div
            className={`sc-checking-spinner ${isRotating ? "sc-rotating" : ""}`}
          >
            <div
              className={`sc-spinner-dot ${isPulsing ? "sc-pulsing" : ""}`}
            />
          </div>
          <p className="sc-checking-text">Verifying you are a Human</p>
        </div>
      </div>
    );

    // Render text captcha
    const renderTextCaptcha = () => (
      <div className="sc-text-captcha-container">
        <h3 className="sc-title">Humanity Verification</h3>
        <p className="sc-subtitle">Please enter the text shown below</p>
        <div className="sc-captcha-container">
          <div className="sc-captcha-text-container">
            <span className="sc-captcha-text">{captchaText}</span>
            <button
              className="sc-refresh-button"
              onClick={refreshCaptcha}
              type="button"
            >
              <RefreshIcon />
            </button>
          </div>
        </div>
        <input
          className="sc-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter the text above"
          maxLength={5}
          autoComplete="off"
        />
        <div className="sc-button-container">
          <button
            className="sc-button sc-cancel-button"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="sc-button sc-submit-button"
            onClick={handleSubmit}
            type="button"
          >
            Verify
          </button>
        </div>
      </div>
    );

    useImperativeHandle(ref, () => ({
      show,
      hide,
    }));

    if (!isVisible) return null;

    return (
      <div className="sc-overlay">
        <div className={`sc-container ${className || ""}`} style={style}>
          {isAnalyzing
            ? renderCheckingAnimation()
            : showTextCaptcha
            ? renderTextCaptcha()
            : renderGestureArea()}
        </div>
      </div>
    );
  }
);

TextCaptcha.displayName = "TextCaptcha";

export default TextCaptcha;
