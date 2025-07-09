#!/usr/bin/env node

/**
 * Pre-commit hook that automatically b  try {
    // Run the version bump script with auto and pre-commit flags
    execSync('node scripts/version-bump.js --auto --pre-commit', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });ersion based on staged changes
 *
 * To install this hook:
 * 1. Make sure you're in the project root
 * 2. Run: npm run install:hooks
 *
 * To uninstall:
 * 1. Run: npm run uninstall:hooks
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Check if we should run the version bump
function shouldBumpVersion() {
  try {
    // Get staged files
    const stagedFiles = execSync("git diff --cached --name-only", {
      encoding: "utf8",
    })
      .split("\n")
      .filter((line) => line.trim());

    // Skip if only package.json is being changed (likely a version bump commit)
    if (stagedFiles.length === 1 && stagedFiles[0] === "package.json") {
      return false;
    }

    // Skip if this is already a version bump commit
    const commitMessage = process.env.GIT_COMMIT_MESSAGE || "";
    if (
      commitMessage.includes("bump version") ||
      commitMessage.includes("chore: bump")
    ) {
      return false;
    }

    // Skip if no meaningful files are staged
    const meaningfulFiles = stagedFiles.filter(
      (file) =>
        !file.includes(".git") && !file.includes("node_modules") && file.trim()
    );

    return meaningfulFiles.length > 0;
  } catch (error) {
    console.log(
      "Warning: Could not determine if version bump is needed:",
      error.message
    );
    return false;
  }
}

function main() {
  console.log("🔍 Pre-commit hook: Checking if version bump is needed...");

  if (!shouldBumpVersion()) {
    console.log("✅ No version bump needed");
    process.exit(0);
  }

  console.log("📦 Running automatic version bump...");

  try {
    // Run the version bump script with auto flag
    execSync("node scripts/version-bump.js --auto", {
      stdio: "inherit",
      cwd: process.cwd(),
    });

    console.log("✅ Version bump completed successfully");

    // The version bump script will have created a new commit
    // We need to exit with code 1 to stop the current commit
    console.log(
      "ℹ️  Your changes have been committed with an automatic version bump"
    );
    process.exit(1);
  } catch (error) {
    console.error("❌ Version bump failed:", error.message);
    console.log("ℹ️  Continuing with original commit...");
    process.exit(0);
  }
}

main();
