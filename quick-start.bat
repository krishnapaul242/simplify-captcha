@echo off
setlocal enabledelayedexpansion

echo 🔒 SimplifyCaptcha Documentation Setup
echo ======================================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are available

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build the library
echo.
echo 🔨 Building library...
call npm run build
if errorlevel 1 (
    echo ❌ Failed to build library
    pause
    exit /b 1
)

echo ✅ Library built successfully

REM Check if documentation files exist
echo.
echo 📖 Checking documentation files...

if not exist "docs\index.html" (
    echo ❌ docs\index.html not found
    pause
    exit /b 1
)

if not exist "docs\styles.css" (
    echo ❌ docs\styles.css not found
    pause
    exit /b 1
)

if not exist "docs\script.js" (
    echo ❌ docs\script.js not found
    pause
    exit /b 1
)

echo ✅ All documentation files are present

REM Check GitHub Actions workflow
echo.
echo 🔍 Checking GitHub Actions workflow...

if not exist ".github\workflows\deploy-docs.yml" (
    echo ⚠️  GitHub Actions workflow not found
    echo    This is needed for automatic deployment to GitHub Pages
) else (
    echo ✅ GitHub Actions workflow is configured
)

REM Start local server
echo.
echo 🚀 Starting local documentation server...

REM Try to use npm script first
echo 📡 Starting server...
echo 🌐 Documentation will be available at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run serve:docs
if errorlevel 1 (
    echo.
    echo ⚠️  npm serve:docs failed, trying alternative methods...
    
    REM Try http-server
    npx http-server docs -p 8080 -o
    if errorlevel 1 (
        echo.
        echo ⚠️  http-server not available, trying Python...
        
        REM Try Python 3
        python --version >nul 2>&1
        if not errorlevel 1 (
            echo 📡 Starting server with Python...
            cd docs
            python -m http.server 8080
        ) else (
            echo.
            echo ❌ No local server available
            echo 💡 You can try:
            echo    1. Install http-server: npm install -g http-server
            echo    2. Open docs\index.html directly in your browser
            echo.
            pause
        )
    )
)

pause
