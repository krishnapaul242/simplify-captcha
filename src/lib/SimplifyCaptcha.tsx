import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { injectStyles } from "./styles";

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

export interface SimplifyCaptchaProps {
  onMessage: (event: { nativeEvent: { data: string } }) => void;
  style?: React.CSSProperties;
  className?: string;
}

export interface SimplifyCaptchaRef {
  show: () => void;
  hide: () => void;
}

const SimplifyCaptcha = forwardRef<SimplifyCaptchaRef, SimplifyCaptchaProps>(
  ({ onMessage, style, className }, ref) => {
    // Inject styles when component mounts
    useEffect(() => {
      injectStyles();
    }, []);

    const [isVisible, setIsVisible] = useState(false);
    const [captchaText, setCaptchaText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showTextCaptcha, setShowTextCaptcha] = useState(false);
    const maxAttempts = 30;

    // Advanced gesture and interaction tracking for web browsers
    const gestureData = useRef({
      mountTime: Date.now(),

      // Mouse tracking
      mouseMovements: [] as Array<{ x: number; y: number; timestamp: number }>,
      mouseTotalDistance: 0,
      mouseVelocityChanges: 0,
      clickCount: 0,
      clickTimings: [] as number[],

      // Touch tracking
      touchPoints: [] as Array<{
        x: number;
        y: number;
        timestamp: number;
        pressure?: number;
      }>,
      touchGestures: 0,
      multiTouchEvents: 0,

      // Scroll tracking
      scrollEvents: 0,
      scrollDirection: { up: 0, down: 0, left: 0, right: 0 },

      // Keyboard tracking
      keystrokeCount: 0,
      keystrokeTiming: [] as number[],

      // General interaction patterns
      totalInteractions: 0,
      userActive: false,
      lastActivityTime: Date.now(),
      interactionPattern: 0,
      naturalBehaviorScore: 0,

      // Device capabilities
      hasTouch: "ontouchstart" in window,
      hasMouse: true, // Assume mouse availability, adjust based on interactions
      devicePixelRatio: window.devicePixelRatio || 1,
    });

    // Real-time gesture and interaction tracking
    useEffect(() => {
      gestureData.current.mountTime = Date.now();
      gestureData.current.lastActivityTime = Date.now();

      // Mouse movement tracking
      const handleMouseMove = (event: MouseEvent) => {
        const now = Date.now();
        const data = gestureData.current;

        // Store mouse position
        const newPoint = { x: event.clientX, y: event.clientY, timestamp: now };
        data.mouseMovements.push(newPoint);

        // Keep only last 50 movements for performance
        if (data.mouseMovements.length > 50) {
          data.mouseMovements.shift();
        }

        // Calculate movement distance and velocity changes
        if (data.mouseMovements.length > 1) {
          const prev = data.mouseMovements[data.mouseMovements.length - 2];
          const distance = Math.sqrt(
            Math.pow(newPoint.x - prev.x, 2) + Math.pow(newPoint.y - prev.y, 2)
          );
          data.mouseTotalDistance += distance;

          // Track velocity changes (indicates human-like movement)
          if (data.mouseMovements.length > 2) {
            const prevPrev =
              data.mouseMovements[data.mouseMovements.length - 3];
            const prevVelocity =
              Math.sqrt(
                Math.pow(prev.x - prevPrev.x, 2) +
                  Math.pow(prev.y - prevPrev.y, 2)
              ) /
              (prev.timestamp - prevPrev.timestamp);
            const currentVelocity = distance / (now - prev.timestamp);

            if (Math.abs(currentVelocity - prevVelocity) > 0.1) {
              data.mouseVelocityChanges++;
            }
          }
        }

        data.userActive = true;
        data.lastActivityTime = now;
        data.totalInteractions++;
        data.hasMouse = true;
      };

      // Mouse click tracking
      const handleMouseClick = () => {
        const now = Date.now();
        const data = gestureData.current;

        data.clickCount++;
        data.clickTimings.push(now);

        // Keep only last 10 clicks
        if (data.clickTimings.length > 10) {
          data.clickTimings.shift();
        }

        data.userActive = true;
        data.lastActivityTime = now;
        data.totalInteractions++;

        // Analyze click patterns for humanness
        if (data.clickTimings.length > 1) {
          const timeBetweenClicks =
            now - data.clickTimings[data.clickTimings.length - 2];
          // Human clicks typically have variation, not perfectly timed
          if (timeBetweenClicks > 100 && timeBetweenClicks < 2000) {
            data.naturalBehaviorScore += 1;
          }
        }
      };

      // Touch event tracking
      const handleTouchStart = (event: TouchEvent) => {
        const now = Date.now();
        const data = gestureData.current;

        data.touchGestures++;
        data.userActive = true;
        data.lastActivityTime = now;
        data.totalInteractions++;

        // Track multi-touch events
        if (event.touches.length > 1) {
          data.multiTouchEvents++;
        }

        // Store touch points
        Array.from(event.touches).forEach((touch) => {
          data.touchPoints.push({
            x: touch.clientX,
            y: touch.clientY,
            timestamp: now,
            pressure: touch.force || 1,
          });
        });

        // Keep only last 20 touch points
        if (data.touchPoints.length > 20) {
          data.touchPoints.shift();
        }

        // Indicate this is primarily a touch device
        data.hasMouse = false;
      };

      // Touch move tracking
      const handleTouchMove = (event: TouchEvent) => {
        const now = Date.now();
        const data = gestureData.current;

        data.userActive = true;
        data.lastActivityTime = now;
        data.totalInteractions++;

        // Track natural touch movement patterns
        if (event.touches.length === 1 && data.touchPoints.length > 0) {
          const touch = event.touches[0];
          const lastPoint = data.touchPoints[data.touchPoints.length - 1];
          const distance = Math.sqrt(
            Math.pow(touch.clientX - lastPoint.x, 2) +
              Math.pow(touch.clientY - lastPoint.y, 2)
          );

          // Natural touch movements have variable speed and direction
          if (distance > 5 && distance < 100) {
            data.naturalBehaviorScore += 0.5;
          }
        }
      };

      // Scroll tracking
      const handleScroll = () => {
        const now = Date.now();
        const data = gestureData.current;

        data.scrollEvents++;
        data.userActive = true;
        data.lastActivityTime = now;
        data.totalInteractions++;

        // Track natural scroll behavior
        data.naturalBehaviorScore += 0.2;
      };

      // Keyboard tracking
      const handleKeyDown = () => {
        const now = Date.now();
        const data = gestureData.current;

        data.keystrokeCount++;
        data.keystrokeTiming.push(now);

        // Keep only last 20 keystrokes
        if (data.keystrokeTiming.length > 20) {
          data.keystrokeTiming.shift();
        }

        data.userActive = true;
        data.lastActivityTime = now;
        data.totalInteractions++;

        // Analyze typing patterns for humanness
        if (data.keystrokeTiming.length > 1) {
          const timeBetweenKeys =
            now - data.keystrokeTiming[data.keystrokeTiming.length - 2];
          // Human typing has natural rhythm variation
          if (timeBetweenKeys > 50 && timeBetweenKeys < 500) {
            data.naturalBehaviorScore += 0.3;
          }
        }
      };

      // Add event listeners
      document.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      document.addEventListener("click", handleMouseClick, { passive: true });
      document.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      document.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      document.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("keydown", handleKeyDown, { passive: true });

      // Cleanup function
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("click", handleMouseClick);
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("scroll", handleScroll);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    // Animation values using CSS animations instead of Animated
    const [isRotating, setIsRotating] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);

    // Calculate human-like score based on real user behavior patterns
    const calculateHumanScore = useCallback(() => {
      const data = gestureData.current;
      const now = Date.now();
      let score = 0;

      // Factor 1: Time spent on page (0-15 points)
      const timeOnPage = now - data.mountTime;
      const timeScore = Math.min(Math.max((timeOnPage - 2000) / 1000, 0), 15); // Start scoring after 2 seconds
      score += timeScore;

      // Factor 2: Mouse movement patterns (0-25 points) - Desktop only
      if (data.hasMouse && data.mouseMovements.length > 5) {
        const mouseScore = Math.min(data.mouseTotalDistance / 100, 15); // Distance traveled
        const velocityScore = Math.min(data.mouseVelocityChanges / 5, 10); // Natural speed changes
        score += mouseScore + velocityScore;
      }

      // Factor 3: Touch interaction patterns (0-25 points) - Mobile only
      if (data.hasTouch && data.touchGestures > 0) {
        const touchScore = Math.min(data.touchGestures * 3, 15); // Touch events
        const multiTouchScore = Math.min(data.multiTouchEvents * 5, 10); // Multi-touch gestures
        score += touchScore + multiTouchScore;
      }

      // Factor 4: Click patterns (0-15 points)
      if (data.clickCount > 0) {
        const clickScore = Math.min(data.clickCount * 2, 10);

        // Analyze click timing variation (human-like randomness)
        let timingVariation = 0;
        if (data.clickTimings.length > 2) {
          const intervals = [];
          for (let i = 1; i < data.clickTimings.length; i++) {
            intervals.push(data.clickTimings[i] - data.clickTimings[i - 1]);
          }
          const avgInterval =
            intervals.reduce((a, b) => a + b, 0) / intervals.length;
          const variance =
            intervals.reduce(
              (sum, interval) => sum + Math.pow(interval - avgInterval, 2),
              0
            ) / intervals.length;
          timingVariation = Math.min(Math.sqrt(variance) / 100, 5); // Reward natural timing variation
        }

        score += clickScore + timingVariation;
      }

      // Factor 5: Keyboard interaction patterns (0-10 points)
      if (data.keystrokeCount > 0) {
        const keystrokeScore = Math.min(data.keystrokeCount * 0.5, 5);

        // Analyze typing rhythm
        let typingRhythm = 0;
        if (data.keystrokeTiming.length > 3) {
          const intervals = [];
          for (let i = 1; i < data.keystrokeTiming.length; i++) {
            intervals.push(
              data.keystrokeTiming[i] - data.keystrokeTiming[i - 1]
            );
          }
          // Human typing has natural rhythm variations
          const hasNaturalRhythm = intervals.some(
            (interval) => interval > 80 && interval < 400
          );
          typingRhythm = hasNaturalRhythm ? 5 : 0;
        }

        score += keystrokeScore + typingRhythm;
      }

      // Factor 6: Scroll behavior (0-10 points)
      if (data.scrollEvents > 0) {
        const scrollScore = Math.min(data.scrollEvents * 1, 10);
        score += scrollScore;
      }

      // Factor 7: Natural behavior score from real-time analysis (0-15 points)
      const behaviorScore = Math.min(data.naturalBehaviorScore, 15);
      score += behaviorScore;

      // Factor 8: Device detection bonus (0-5 points)
      // Reward consistent device usage patterns
      let deviceBonus = 0;
      if (data.hasTouch && data.touchGestures > 0) {
        deviceBonus = 3; // Mobile device with touch interactions
      } else if (!data.hasTouch && data.mouseMovements.length > 0) {
        deviceBonus = 5; // Desktop device with mouse movements
      }
      score += deviceBonus;

      // Penalty for bot-like behavior
      const sessionTime = timeOnPage;
      if (sessionTime < 1000) {
        score *= 0.3; // Too fast, likely bot
      } else if (data.totalInteractions === 0) {
        score *= 0.1; // No interactions, likely bot
      }

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

SimplifyCaptcha.displayName = "SimplifyCaptcha";

export default SimplifyCaptcha;
