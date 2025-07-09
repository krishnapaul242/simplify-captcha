import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useRef,
  useEffect,
  memo,
  useMemo,
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

// SVG CAPTCHA component with distortion effects
const SvgCaptcha = memo(({ text }: { text: string }) => {
  // Memoize the captcha configuration to prevent constant regeneration
  const captchaConfig = useMemo(() => {
    // Generate random colors for each character
    const generateRandomColor = () => {
      const colors = [
        "#2C3E50",
        "#34495E",
        "#7F8C8D",
        "#95A5A6",
        "#BDC3C7",
        "#E74C3C",
        "#C0392B",
        "#E67E22",
        "#D35400",
        "#F39C12",
        "#F1C40F",
        "#27AE60",
        "#2ECC71",
        "#16A085",
        "#1ABC9C",
        "#3498DB",
        "#2980B9",
        "#9B59B6",
        "#8E44AD",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Generate random rotation for each character
    const generateRandomRotation = () => Math.random() * 30 - 15; // -15 to 15 degrees

    // Generate random scale for each character
    const generateRandomScale = () => 0.8 + Math.random() * 0.4; // 0.8 to 1.2

    // Generate random vertical offset
    const generateRandomOffset = () => Math.random() * 10 - 5; // -5 to 5 pixels

    // Generate noise pattern for background
    const generateNoisePattern = () => {
      const points = [];
      for (let i = 0; i < 50; i++) {
        points.push({
          x: Math.random() * 280,
          y: Math.random() * 80,
          radius: Math.random() * 2 + 1,
        });
      }
      return points;
    };

    // Generate character configurations
    const characterConfigs = text.split("").map(() => ({
      color: generateRandomColor(),
      rotation: generateRandomRotation(),
      scale: generateRandomScale(),
      offsetY: generateRandomOffset(),
    }));

    // Generate background elements
    const noisePoints = generateNoisePattern();
    const turbulenceSeed = Math.floor(Math.random() * 100);

    // Generate distraction lines
    const distractionLines = [
      {
        path: `M${Math.random() * 50},${20 + Math.random() * 40} Q${
          70 + Math.random() * 50
        },${10 + Math.random() * 60} ${150 + Math.random() * 50},${
          30 + Math.random() * 20
        }`,
      },
      {
        path: `M${200 + Math.random() * 30},${15 + Math.random() * 50} Q${
          230 + Math.random() * 20
        },${40 + Math.random() * 20} ${260 + Math.random() * 15},${
          25 + Math.random() * 30
        }`,
      },
    ];

    // Generate additional distraction elements
    const distractionElements = {
      circle: {
        cx: 50 + Math.random() * 180,
        cy: 20 + Math.random() * 40,
      },
      rect: {
        x: 100 + Math.random() * 80,
        y: 55 + Math.random() * 15,
        rotation: Math.random() * 60 - 30,
      },
    };

    return {
      characterConfigs,
      noisePoints,
      turbulenceSeed,
      distractionLines,
      distractionElements,
    };
  }, [text]); // Only regenerate when text changes

  return (
    <svg
      width="280"
      height="80"
      viewBox="0 0 280 80"
      className="sc-svg-captcha"
      style={{ userSelect: "none" }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <defs>
        {/* Gradient definitions for visual appeal */}
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8f9fa" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#e9ecef" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#dee2e6" stopOpacity="0.4" />
        </linearGradient>

        {/* Distortion filters */}
        <filter id="distortion" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            baseFrequency="0.02 0.03"
            numOctaves="2"
            result="turbulence"
            seed={captchaConfig.turbulenceSeed}
          />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="3" />
        </filter>

        {/* Shadow filter */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="1"
            dy="1"
            stdDeviation="1"
            floodColor="rgba(0,0,0,0.3)"
          />
        </filter>

        {/* Stroke pattern */}
        <pattern
          id="linePattern"
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
        >
          <rect width="4" height="4" fill="none" />
          <path d="M0,4 L4,0" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Background with gradient */}
      <rect width="280" height="80" fill="url(#bgGradient)" />

      {/* Background pattern overlay */}
      <rect width="280" height="80" fill="url(#linePattern)" opacity="0.5" />

      {/* Background noise points */}
      {captchaConfig.noisePoints.map((point, index) => (
        <circle
          key={`noise-${index}`}
          cx={point.x}
          cy={point.y}
          r={point.radius}
          fill="rgba(0,0,0,0.1)"
          opacity="0.3"
        />
      ))}

      {/* Distraction lines */}
      {captchaConfig.distractionLines.map((line, index) => (
        <path
          key={`line-${index}`}
          d={line.path}
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      ))}

      {/* Render each character with individual transformations */}
      {text.split("").map((char, index) => {
        const x = 35 + index * 45; // Base spacing between characters
        const y = 45; // Base y position
        const config = captchaConfig.characterConfigs[index];

        return (
          <g key={`char-${index}`}>
            {/* Character shadow/outline for better readability */}
            <text
              x={x + 1}
              y={y + config.offsetY + 1}
              fontSize="32"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
              fill="rgba(0,0,0,0.3)"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${config.rotation} ${x} ${
                y + config.offsetY
              }) scale(${config.scale})`}
              filter="url(#distortion)"
            >
              {char}
            </text>

            {/* Main character */}
            <text
              x={x}
              y={y + config.offsetY}
              fontSize="32"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
              fill={config.color}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${config.rotation} ${x} ${
                y + config.offsetY
              }) scale(${config.scale})`}
              filter="url(#distortion)"
            >
              {char}
            </text>
          </g>
        );
      })}

      {/* Additional distraction elements */}
      <circle
        cx={captchaConfig.distractionElements.circle.cx}
        cy={captchaConfig.distractionElements.circle.cy}
        r="2"
        fill="rgba(0,0,0,0.2)"
        opacity="0.5"
      />
      <rect
        x={captchaConfig.distractionElements.rect.x}
        y={captchaConfig.distractionElements.rect.y}
        width="3"
        height="8"
        fill="rgba(0,0,0,0.15)"
        transform={`rotate(${captchaConfig.distractionElements.rect.rotation})`}
        opacity="0.4"
      />
    </svg>
  );
});

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
          <div className="sc-captcha-svg-container">
            <SvgCaptcha text={captchaText} />
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
