// Interaction tracking variables
let interactionStats = {
  mouseMovements: 0,
  clicks: 0,
  scrolls: 0,
  keystrokes: 0,
  deviceType: "Desktop",
  humanScore: 0,
};

// Demo CAPTCHA simulation
let captchaVisible = false;
let analysisProgress = 0;
let analysisInterval;

// Initialize the demo when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeInteractionTracking();
  initializeDemoControls();
  initializeNavigation();
});

// Initialize interaction tracking
function initializeInteractionTracking() {
  // Mouse movement tracking
  document.addEventListener("mousemove", function () {
    interactionStats.mouseMovements++;
    if (interactionStats.mouseMovements % 10 === 0) {
      updateStatsDisplay();
    }
    calculateHumanScore();
  });

  // Click tracking
  document.addEventListener("click", function () {
    interactionStats.clicks++;
    updateStatsDisplay();
    calculateHumanScore();
  });

  // Scroll tracking
  document.addEventListener("scroll", function () {
    interactionStats.scrolls++;
    updateStatsDisplay();
    calculateHumanScore();
  });

  // Keyboard tracking
  document.addEventListener("keydown", function () {
    interactionStats.keystrokes++;
    updateStatsDisplay();
    calculateHumanScore();
  });

  // Touch detection
  document.addEventListener("touchstart", function () {
    interactionStats.deviceType = "Mobile/Touch";
    updateStatsDisplay();
  });

  // Update display every 2 seconds
  setInterval(updateStatsDisplay, 2000);
}

// Calculate human behavior score
function calculateHumanScore() {
  let score = 0;

  // Base score from interactions
  if (interactionStats.mouseMovements > 0) score += 20;
  if (interactionStats.clicks > 0) score += 20;
  if (interactionStats.scrolls > 0) score += 20;
  if (interactionStats.keystrokes > 0) score += 20;

  // Bonus for natural interaction patterns
  if (interactionStats.mouseMovements > 50) score += 10;
  if (interactionStats.scrolls > 5) score += 10;

  interactionStats.humanScore = Math.min(score, 100);
}

// Update stats display
function updateStatsDisplay() {
  document.getElementById("mouse-count").textContent =
    interactionStats.mouseMovements;
  document.getElementById("click-count").textContent = interactionStats.clicks;
  document.getElementById("scroll-count").textContent =
    interactionStats.scrolls;
  document.getElementById("keystroke-count").textContent =
    interactionStats.keystrokes;
  document.getElementById("device-type").textContent =
    interactionStats.deviceType;
  document.getElementById("human-score").textContent =
    interactionStats.humanScore + "%";
}

// Initialize demo controls
function initializeDemoControls() {
  const showCaptchaBtn = document.getElementById("show-captcha-btn");
  const placeholder = document.getElementById("demo-captcha-placeholder");
  const demoLog = document.getElementById("demo-log");

  showCaptchaBtn.addEventListener("click", function () {
    if (!captchaVisible) {
      showDemoCaptcha();
    }
  });

  function showDemoCaptcha() {
    captchaVisible = true;
    addLogMessage("🔒 CAPTCHA verification started...");

    // Replace placeholder with analyzing state
    placeholder.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-icon">🤖</div>
                <h3>Analyzing Behavior</h3>
                <p>Please wait while we verify you're human...</p>
                <div class="analysis-progress">
                    <div class="progress-bar" id="analysis-progress-bar"></div>
                </div>
                <div class="analysis-stats">
                    <p>Human Score: <span id="current-score">${interactionStats.humanScore}%</span></p>
                </div>
                <button id="cancel-captcha-btn" class="btn btn-secondary" style="margin-top: 1rem;">Cancel</button>
            </div>
        `;

    // Add progress bar styles
    const progressContainer = placeholder.querySelector(".analysis-progress");
    progressContainer.style.cssText = `
            width: 100%;
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
            margin: 1rem 0;
        `;

    const progressBar = document.getElementById("analysis-progress-bar");
    progressBar.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #48d1cc, #40e0d0);
            border-radius: 4px;
            width: 0%;
            transition: width 0.3s ease;
        `;

    // Start analysis simulation
    startAnalysisSimulation();

    // Add cancel functionality
    document
      .getElementById("cancel-captcha-btn")
      .addEventListener("click", function () {
        cancelCaptcha();
      });
  }

  function startAnalysisSimulation() {
    analysisProgress = 0;

    analysisInterval = setInterval(function () {
      analysisProgress += Math.random() * 15 + 5; // Random progress between 5-20%

      const progressBar = document.getElementById("analysis-progress-bar");
      const currentScore = document.getElementById("current-score");

      if (progressBar) {
        progressBar.style.width = Math.min(analysisProgress, 100) + "%";
      }

      if (currentScore) {
        currentScore.textContent = interactionStats.humanScore + "%";
      }

      // Add analysis messages
      if (analysisProgress > 25 && analysisProgress < 30) {
        addLogMessage("📊 Analyzing mouse movement patterns...");
      } else if (analysisProgress > 50 && analysisProgress < 55) {
        addLogMessage("🔍 Checking interaction timing...");
      } else if (analysisProgress > 75 && analysisProgress < 80) {
        addLogMessage("✨ Verifying human behavior score...");
      }

      if (analysisProgress >= 100) {
        clearInterval(analysisInterval);
        completeAnalysis();
      }
    }, 200);
  }

  function completeAnalysis() {
    const isVerified = interactionStats.humanScore >= 60; // Need 60% or higher

    if (isVerified) {
      addLogMessage("✅ Verification successful! You are human.");
      placeholder.innerHTML = `
                <div class="placeholder-content">
                    <div class="placeholder-icon" style="color: #10b981;">✅</div>
                    <h3 style="color: #10b981;">Verified!</h3>
                    <p>You have been successfully verified as human.</p>
                    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 1rem;">
                        Score: ${interactionStats.humanScore}% (${
        interactionStats.humanScore >= 60 ? "Pass" : "Fail"
      })
                    </p>
                    <button id="reset-demo-btn" class="btn btn-primary" style="margin-top: 1rem;">Try Again</button>
                </div>
            `;
    } else {
      addLogMessage("❌ Verification failed. Showing text CAPTCHA...");
      showTextCaptcha();
    }

    // Add reset functionality
    const resetBtn = document.getElementById("reset-demo-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", resetDemo);
    }
  }

  function showTextCaptcha() {
    const captchaCode = generateCaptchaCode();

    placeholder.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-icon">🔤</div>
                <h3>Text Verification</h3>
                <p>Please enter the code below:</p>
                <div class="captcha-code" style="font-family: monospace; font-size: 1.5rem; font-weight: bold; letter-spacing: 3px; margin: 1rem 0; color: #1f2937; background: #f3f4f6; padding: 1rem; border-radius: 8px;">${captchaCode}</div>
                <input type="text" id="captcha-input" placeholder="Enter code" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin: 0.5rem 0; width: 200px; text-align: center; font-family: monospace;" />
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button id="verify-text-btn" class="btn btn-primary">Verify</button>
                    <button id="refresh-captcha-btn" class="btn btn-secondary">🔄 Refresh</button>
                    <button id="cancel-text-btn" class="btn btn-secondary">Cancel</button>
                </div>
            </div>
        `;

    // Add text CAPTCHA functionality
    const input = document.getElementById("captcha-input");
    const verifyBtn = document.getElementById("verify-text-btn");
    const refreshBtn = document.getElementById("refresh-captcha-btn");
    const cancelBtn = document.getElementById("cancel-text-btn");

    verifyBtn.addEventListener("click", function () {
      if (input.value.toLowerCase() === captchaCode.toLowerCase()) {
        addLogMessage("✅ Text CAPTCHA verified successfully!");
        completeAnalysis();
      } else {
        addLogMessage("❌ Incorrect code. Please try again.");
        input.value = "";
        input.style.borderColor = "#ef4444";
        setTimeout(() => {
          input.style.borderColor = "#d1d5db";
        }, 2000);
      }
    });

    refreshBtn.addEventListener("click", function () {
      showTextCaptcha();
    });

    cancelBtn.addEventListener("click", cancelCaptcha);

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        verifyBtn.click();
      }
    });
  }

  function generateCaptchaCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function cancelCaptcha() {
    addLogMessage("❌ CAPTCHA verification cancelled.");
    resetDemo();
  }

  function resetDemo() {
    captchaVisible = false;
    analysisProgress = 0;
    if (analysisInterval) {
      clearInterval(analysisInterval);
    }

    placeholder.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-icon">🔒</div>
                <h3>CAPTCHA Demo</h3>
                <p>Click "Show CAPTCHA" to test the component</p>
                <button id="show-captcha-btn" class="btn btn-primary">Show CAPTCHA</button>
            </div>
        `;

    // Re-attach event listener
    document
      .getElementById("show-captcha-btn")
      .addEventListener("click", function () {
        if (!captchaVisible) {
          showDemoCaptcha();
        }
      });
  }

  function addLogMessage(message) {
    const timestamp = new Date().toLocaleTimeString();
    const logItem = document.createElement("p");
    logItem.className = "log-item";
    logItem.textContent = `[${timestamp}] ${message}`;

    demoLog.appendChild(logItem);
    demoLog.scrollTop = demoLog.scrollHeight;

    // Keep only last 10 messages
    while (demoLog.children.length > 10) {
      demoLog.removeChild(demoLog.firstChild);
    }
  }
}

// Initialize navigation
function initializeNavigation() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar scroll effect
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop;
  });

  // Active navigation highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  const mobileBtn = document.querySelector(".mobile-menu-btn");

  navLinks.classList.toggle("mobile-open");
  mobileBtn.classList.toggle("active");
}

// Copy code functionality
function copyCode(button) {
  const codeBlock = button.nextElementSibling.querySelector("code");
  const text = codeBlock.textContent;

  navigator.clipboard.writeText(text).then(function () {
    button.textContent = "Copied!";
    setTimeout(function () {
      button.textContent = "Copy";
    }, 2000);
  });
}

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe feature cards and other elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".feature-card, .example-card, .step"
  );
  animatedElements.forEach((el) => observer.observe(el));
});

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
    .feature-card,
    .example-card,
    .step {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animate-in,
    .example-card.animate-in,
    .step.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: #48d1cc !important;
    }
    
    .mobile-open {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem 2rem;
        border-top: 1px solid #e5e7eb;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }
`;
document.head.appendChild(style);
