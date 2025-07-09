#!/usr/bin/env node

/**
 * Install git hooks for automatic version bumping
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

function installHooks() {
  const gitHooksDir = path.join(process.cwd(), ".git", "hooks");
  const preCommitHook = path.join(gitHooksDir, "pre-commit");

  // Check if .git directory exists
  if (!fs.existsSync(path.join(process.cwd(), ".git"))) {
    console.error("❌ Error: Not in a git repository");
    process.exit(1);
  }

  // Create hooks directory if it doesn't exist
  if (!fs.existsSync(gitHooksDir)) {
    fs.mkdirSync(gitHooksDir, { recursive: true });
  }

  // Create the pre-commit hook
  const hookContent = `#!/bin/sh
# Auto-generated pre-commit hook for version bumping
node scripts/pre-commit-hook.js
`;

  fs.writeFileSync(preCommitHook, hookContent);

  // Make it executable (Unix systems)
  try {
    execSync(`chmod +x "${preCommitHook}"`);
  } catch (error) {
    // Ignore on Windows
  }

  console.log("✅ Git hooks installed successfully!");
  console.log("");
  console.log("📋 What this does:");
  console.log("   • Automatically analyzes your changes before each commit");
  console.log("   • Bumps the version in package.json based on change type");
  console.log("   • Creates a separate commit with the version bump");
  console.log("");
  console.log("🔧 To uninstall: npm run uninstall:hooks");
}

function uninstallHooks() {
  const preCommitHook = path.join(process.cwd(), ".git", "hooks", "pre-commit");

  if (fs.existsSync(preCommitHook)) {
    fs.unlinkSync(preCommitHook);
    console.log("✅ Git hooks uninstalled successfully!");
  } else {
    console.log("ℹ️  No git hooks found to uninstall");
  }
}

// Parse command line arguments
const command = process.argv[2];

switch (command) {
  case "install":
    installHooks();
    break;
  case "uninstall":
    uninstallHooks();
    break;
  default:
    console.log(`
📦 Git Hooks Manager

Usage:
  node scripts/install-hooks.js install     Install pre-commit hooks
  node scripts/install-hooks.js uninstall   Remove pre-commit hooks

The pre-commit hook will automatically:
• Analyze staged changes
• Determine appropriate version bump (major/minor/patch)
• Update package.json version
• Create a version bump commit

This ensures your package version is always up-to-date before publishing.
`);
    process.exit(1);
}
