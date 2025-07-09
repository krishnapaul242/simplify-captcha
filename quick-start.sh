#!/bin/bash

# SimplifyCaptcha Documentation Quick Start Script
# This script helps you set up and test the documentation locally

echo "🔒 SimplifyCaptcha Documentation Setup"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js and npm are available${NC}"

# Install dependencies
echo -e "\n${BLUE}📦 Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Build the library
echo -e "\n${BLUE}🔨 Building library...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to build library${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Library built successfully${NC}"

# Check if documentation files exist
echo -e "\n${BLUE}📖 Checking documentation files...${NC}"

if [ ! -f "docs/index.html" ]; then
    echo -e "${RED}❌ docs/index.html not found${NC}"
    exit 1
fi

if [ ! -f "docs/styles.css" ]; then
    echo -e "${RED}❌ docs/styles.css not found${NC}"
    exit 1
fi

if [ ! -f "docs/script.js" ]; then
    echo -e "${RED}❌ docs/script.js not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All documentation files are present${NC}"

# Check GitHub Actions workflow
echo -e "\n${BLUE}🔍 Checking GitHub Actions workflow...${NC}"

if [ ! -f ".github/workflows/deploy-docs.yml" ]; then
    echo -e "${YELLOW}⚠️  GitHub Actions workflow not found${NC}"
    echo -e "${YELLOW}   This is needed for automatic deployment to GitHub Pages${NC}"
else
    echo -e "${GREEN}✅ GitHub Actions workflow is configured${NC}"
fi

# Start local server
echo -e "\n${BLUE}🚀 Starting local documentation server...${NC}"

# Check if http-server is available
if command -v http-server &> /dev/null; then
    echo -e "${GREEN}📡 Starting server with http-server...${NC}"
    echo -e "${YELLOW}🌐 Documentation will be available at: http://localhost:8080${NC}"
    echo -e "${YELLOW}📱 Mobile access: http://[your-ip]:8080${NC}"
    echo -e "\n${BLUE}Press Ctrl+C to stop the server${NC}\n"
    http-server docs -p 8080 -o
elif command -v python3 &> /dev/null; then
    echo -e "${GREEN}📡 Starting server with Python 3...${NC}"
    echo -e "${YELLOW}🌐 Documentation will be available at: http://localhost:8080${NC}"
    echo -e "\n${BLUE}Press Ctrl+C to stop the server${NC}\n"
    cd docs && python3 -m http.server 8080
elif command -v python &> /dev/null; then
    echo -e "${GREEN}📡 Starting server with Python...${NC}"
    echo -e "${YELLOW}🌐 Documentation will be available at: http://localhost:8080${NC}"
    echo -e "\n${BLUE}Press Ctrl+C to stop the server${NC}\n"
    cd docs && python -m http.server 8080
else
    echo -e "${YELLOW}⚠️  No local server available${NC}"
    echo -e "${BLUE}💡 Install a local server to test the documentation:${NC}"
    echo -e "   npm install -g http-server"
    echo -e "   Then run: npm run serve:docs"
    echo -e "\n${BLUE}📂 You can also open docs/index.html directly in your browser${NC}"
fi
