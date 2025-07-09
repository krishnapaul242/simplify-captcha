#!/usr/bin/env node

import fs from "fs";
import { execSync } from "child_process";
import path from "path";

/**
 * Automatically bump version based on git changes
 *
 * Rules:
 * - MAJOR: Breaking changes (indicated by BREAKING CHANGE in commit messages or specific file patterns)
 * - MINOR: New features (new files, new exports, significant additions)
 * - PATCH: Bug fixes, documentation updates, small changes
 */

class VersionBumper {
  constructor() {
    this.packageJsonPath = path.join(process.cwd(), "package.json");
    this.breakingChangePatterns = [
      /BREAKING[\s\-_]CHANGE/i,
      /breaking[\s\-_]change/i,
      /\bbreaking\b/i,
    ];
    this.majorChangePatterns = [
      /^src\/lib\/.*\.tsx?$/, // Core library changes
      /^src\/lib\/index\.ts$/, // Main export changes
      /package\.json$/, // Dependencies changes (excluding version bumps)
    ];
    this.minorChangePatterns = [
      /^src\/lib\/.*\.(tsx?|css)$/, // New components or styles
      /^src\/demo\/.*$/, // New demo features
      /README\.md$/, // Significant documentation updates
      /\.d\.ts$/, // Type definition changes
    ];
  }

  /**
   * Get the current version from package.json
   */
  getCurrentVersion() {
    try {
      const packageJson = JSON.parse(
        fs.readFileSync(this.packageJsonPath, "utf8")
      );
      return packageJson.version;
    } catch (error) {
      console.error("Error reading package.json:", error.message);
      process.exit(1);
    }
  }

  /**
   * Get git changes since last version tag
   */
  getGitChanges() {
    try {
      // Get the last version tag
      let lastTag;
      try {
        lastTag = execSync("git describe --tags --abbrev=0", {
          encoding: "utf8",
        }).trim();
      } catch {
        // If no tags exist, compare with initial commit
        lastTag = execSync("git rev-list --max-parents=0 HEAD", {
          encoding: "utf8",
        }).trim();
      }

      // Get changed files
      const changedFiles = execSync(`git diff --name-only ${lastTag}..HEAD`, {
        encoding: "utf8",
      })
        .split("\n")
        .filter((line) => line.trim());

      // Get commit messages
      const commitMessages = execSync(
        `git log ${lastTag}..HEAD --pretty=format:"%s %b"`,
        { encoding: "utf8" }
      )
        .split("\n")
        .filter((line) => line.trim());

      // Get file change stats
      const changeStats = execSync(`git diff --numstat ${lastTag}..HEAD`, {
        encoding: "utf8",
      })
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => {
          const [added, deleted, file] = line.split("\t");
          return {
            file,
            added: parseInt(added) || 0,
            deleted: parseInt(deleted) || 0,
            total: (parseInt(added) || 0) + (parseInt(deleted) || 0),
          };
        });

      return {
        changedFiles,
        commitMessages,
        changeStats,
        lastTag,
      };
    } catch (error) {
      console.error("Error getting git changes:", error.message);
      process.exit(1);
    }
  }

  /**
   * Analyze changes and determine version bump type
   */
  analyzeChanges(changes) {
    const { changedFiles, commitMessages, changeStats } = changes;

    console.log("\n📊 Analyzing changes...");
    console.log(`📁 Changed files: ${changedFiles.length}`);
    console.log(`💬 Commits: ${commitMessages.length}`);

    // Check for breaking changes in commit messages
    const hasBreakingChanges = commitMessages.some((message) =>
      this.breakingChangePatterns.some((pattern) => pattern.test(message))
    );

    if (hasBreakingChanges) {
      console.log("🔴 Breaking changes detected in commit messages");
      return "major";
    }

    // Analyze file changes
    let majorScore = 0;
    let minorScore = 0;
    let patchScore = 0;

    for (const file of changedFiles) {
      const stats = changeStats.find((s) => s.file === file);
      const changeSize = stats ? stats.total : 0;

      // Skip version bump commits
      if (file === "package.json" && changeSize <= 3) {
        continue;
      }

      // Check for major changes
      if (this.majorChangePatterns.some((pattern) => pattern.test(file))) {
        majorScore += Math.min(changeSize / 10, 5); // Cap individual file impact
        console.log(`🔴 Major change: ${file} (${changeSize} lines)`);
      }
      // Check for minor changes
      else if (this.minorChangePatterns.some((pattern) => pattern.test(file))) {
        minorScore += Math.min(changeSize / 20, 3);
        console.log(`🟡 Minor change: ${file} (${changeSize} lines)`);
      }
      // Everything else is patch
      else {
        patchScore += Math.min(changeSize / 50, 1);
        console.log(`🟢 Patch change: ${file} (${changeSize} lines)`);
      }
    }

    console.log(
      `\n📈 Scores - Major: ${majorScore.toFixed(
        1
      )}, Minor: ${minorScore.toFixed(1)}, Patch: ${patchScore.toFixed(1)}`
    );

    // Determine bump type based on scores and thresholds
    if (majorScore > 2) {
      console.log(
        "🔴 Major version bump recommended (significant core changes)"
      );
      return "major";
    } else if (minorScore > 3 || majorScore > 0) {
      console.log(
        "🟡 Minor version bump recommended (new features or minor core changes)"
      );
      return "minor";
    } else {
      console.log(
        "🟢 Patch version bump recommended (bug fixes and small changes)"
      );
      return "patch";
    }
  }

  /**
   * Bump version in package.json
   */
  bumpVersion(bumpType) {
    const currentVersion = this.getCurrentVersion();
    const [major, minor, patch] = currentVersion.split(".").map(Number);

    let newVersion;
    switch (bumpType) {
      case "major":
        newVersion = `${major + 1}.0.0`;
        break;
      case "minor":
        newVersion = `${major}.${minor + 1}.0`;
        break;
      case "patch":
        newVersion = `${major}.${minor}.${patch + 1}`;
        break;
      default:
        throw new Error(`Invalid bump type: ${bumpType}`);
    }

    // Update package.json
    const packageJson = JSON.parse(
      fs.readFileSync(this.packageJsonPath, "utf8")
    );
    packageJson.version = newVersion;
    fs.writeFileSync(
      this.packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n"
    );

    console.log(
      `\n✅ Version bumped: ${currentVersion} → ${newVersion} (${bumpType})`
    );
    return newVersion;
  }

  /**
   * Create a commit with the version bump
   */
  commitVersionBump(newVersion, bumpType) {
    try {
      if (process.argv.includes('--pre-commit')) {
        // When called from pre-commit hook, just stage the package.json
        // The version bump will be included in the current commit
        execSync("git add package.json", { stdio: "inherit" });
        console.log(`📝 Staged package.json with version ${newVersion} for current commit`);
      } else {
        // Normal operation - create a separate commit for version bump
        execSync("git add package.json", { stdio: "inherit" });
        execSync(
          `git commit -m "chore: bump version to ${newVersion} (${bumpType})"`,
          { stdio: "inherit" }
        );
        console.log(`📝 Created commit for version ${newVersion}`);
      }
    } catch (error) {
      console.error("Error committing version bump:", error.message);
      process.exit(1);
    }
  }

  /**
   * Main execution function
   */
  run() {
    console.log("🚀 Starting automatic version bump...\n");

    // Check if we're in a git repository
    try {
      execSync("git rev-parse --git-dir", { stdio: "pipe" });
    } catch {
      console.error("Error: Not in a git repository");
      process.exit(1);
    }

    // Check for uncommitted changes (excluding package.json)
    // Skip this check if called from pre-commit hook
    if (!process.argv.includes('--pre-commit')) {
      try {
        const status = execSync("git status --porcelain", { encoding: "utf8" });
        const uncommittedFiles = status
          .split("\n")
          .filter((line) => line.trim())
          .filter((line) => !line.includes("package.json"));

        if (uncommittedFiles.length > 0) {
          console.error(
            "Error: You have uncommitted changes. Please commit them first."
          );
          console.log("Uncommitted files:");
          uncommittedFiles.forEach((file) => console.log(`  ${file}`));
          process.exit(1);
        }
      } catch (error) {
        console.error("Error checking git status:", error.message);
        process.exit(1);
      }
    } else {
      // When called from pre-commit hook, only check for unstaged changes
      try {
        const status = execSync("git diff --name-only", { encoding: "utf8" });
        const unstagedFiles = status
          .split("\n")
          .filter((line) => line.trim())
          .filter((line) => !line.includes("package.json"));

        if (unstagedFiles.length > 0) {
          console.error(
            "Error: You have unstaged changes. Please stage them first."
          );
          console.log("Unstaged files:");
          unstagedFiles.forEach((file) => console.log(`  ${file}`));
          process.exit(1);
        }
      } catch (error) {
        console.error("Error checking git status:", error.message);
        process.exit(1);
      }
    }

    const currentVersion = this.getCurrentVersion();
    console.log(`📦 Current version: ${currentVersion}`);

    const changes = this.getGitChanges();

    if (changes.changedFiles.length === 0) {
      console.log(
        "ℹ️  No changes detected since last version. No version bump needed."
      );
      return;
    }

    const bumpType = this.analyzeChanges(changes);
    const newVersion = this.bumpVersion(bumpType);

    // Ask for confirmation unless --auto flag is provided
    if (!process.argv.includes("--auto")) {
      console.log("\n❓ Do you want to commit this version bump? (y/n)");
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.on("data", (key) => {
        const response = key.toString().toLowerCase();
        if (response === "y") {
          this.commitVersionBump(newVersion, bumpType);
          console.log("\n🎉 Version bump completed successfully!");
          process.exit(0);
        } else if (response === "n") {
          console.log("\n❌ Version bump cancelled");
          process.exit(0);
        }
      });
    } else {
      this.commitVersionBump(newVersion, bumpType);
      console.log("\n🎉 Version bump completed automatically!");
    }
  }
}

// Handle command line arguments
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`
📦 Automatic Version Bumper

Usage:
  node scripts/version-bump.js [options]

Options:
  --auto        Automatically commit without confirmation
  --pre-commit  Skip uncommitted changes check (used by git hooks)
  --help        Show this help message

Rules:
  🔴 MAJOR: Breaking changes, significant core library changes
  🟡 MINOR: New features, new components, API additions  
  🟢 PATCH: Bug fixes, documentation updates, small changes

The script analyzes git changes since the last version tag and automatically
determines the appropriate semantic version bump.
`);
  process.exit(0);
}

// Run the version bumper
const bumper = new VersionBumper();
bumper.run();
