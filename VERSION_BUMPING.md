# Automatic Version Bumping

This project includes an intelligent automatic version bumping system that analyzes your changes and updates the package version according to semantic versioning rules.

## 🚀 Quick Start

### Manual Version Bump

```bash
# Analyze changes and bump version with confirmation
npm run version:bump

# Automatically bump version without confirmation
npm run version:bump:auto
```

### Automatic Version Bump (Recommended)

```bash
# Install pre-commit hooks for automatic version bumping
npm run install:hooks

# Now every commit will automatically bump the version!
# To disable:
npm run uninstall:hooks
```

## 📊 How It Works

The version bumper analyzes your git changes since the last version tag and determines the appropriate semantic version bump:

### 🔴 MAJOR Version (X.0.0)

- Breaking changes indicated in commit messages (`BREAKING CHANGE`, `breaking change`)
- Significant changes to core library files (`src/lib/*.tsx`, `src/lib/index.ts`)
- Major dependency changes in `package.json`

### 🟡 MINOR Version (0.X.0)

- New features and components
- New exports or API additions
- Significant documentation updates
- Type definition changes

### 🟢 PATCH Version (0.0.X)

- Bug fixes
- Small documentation updates
- Style/formatting changes
- Test updates

## 🎯 Change Analysis Rules

The system uses intelligent scoring based on:

1. **File patterns** - Different types of files have different impact weights
2. **Change size** - Number of lines added/deleted
3. **Commit messages** - Keywords like "BREAKING CHANGE"
4. **File importance** - Core library files vs. documentation

### File Pattern Examples

```text
🔴 Major Impact:
src/lib/SimplifyCaptcha.tsx     # Core component changes
src/lib/index.ts                # Main exports
package.json                    # Dependency changes

🟡 Minor Impact:
src/lib/NewComponent.tsx        # New components
src/demo/NewFeature.tsx         # New demo features
README.md                       # Documentation updates
*.d.ts                          # Type definitions

🟢 Patch Impact:
src/demo/Demo.css               # Styling updates
docs/**                         # Documentation files
*.test.ts                       # Test files
```

## 🔧 Usage Examples

### With Git Hooks (Automatic)

```bash
# Install hooks once
npm run install:hooks

# Now commit normally - version will be bumped automatically
git add .
git commit -m "feat: add new gesture tracking feature"
# → Automatically creates version bump commit

git add .
git commit -m "fix: resolve captcha validation bug"
# → Automatically creates version bump commit

git add .
git commit -m "BREAKING CHANGE: remove deprecated API"
# → Automatically creates major version bump commit
```

### Manual Usage

```bash
# Interactive mode (asks for confirmation)
npm run version:bump

# Automatic mode (no confirmation)
npm run version:bump:auto

# With help
node scripts/version-bump.js --help
```

## 📝 Commit Message Conventions

To ensure proper version bumping, follow these commit message patterns:

```bash
# Patch changes
git commit -m "fix: resolve button alignment issue"
git commit -m "docs: update installation instructions"
git commit -m "style: improve code formatting"

# Minor changes  
git commit -m "feat: add new verification method"
git commit -m "feat: improve accessibility support"

# Major changes
git commit -m "feat: new API structure

BREAKING CHANGE: The verify() method now returns a Promise instead of boolean"

git commit -m "refactor: breaking change to component props"
```

## 🛠️ Configuration

The version bumper can be customized by modifying `scripts/version-bump.js`:

- **File patterns**: Adjust which files trigger different bump types
- **Scoring weights**: Change how much impact different changes have
- **Thresholds**: Modify when to bump major vs. minor vs. patch

## 🔍 Troubleshooting

### Hook Not Working

```bash
# Check if hooks are installed
ls -la .git/hooks/pre-commit

# Reinstall hooks
npm run uninstall:hooks
npm run install:hooks
```

### Version Not Bumping

```bash
# Check for uncommitted changes
git status

# Ensure you're not on a version bump commit
git log --oneline -5
```

### Manual Override

```bash
# Skip automatic version bump for specific commit
git commit -m "docs: update README" --no-verify

# Or temporarily uninstall hooks
npm run uninstall:hooks
```

## 📋 Best Practices

1. **Commit frequently** - Smaller commits get more accurate version bumps
2. **Use descriptive commit messages** - Include keywords like "feat:", "fix:", "BREAKING CHANGE"
3. **Review version bumps** - Check the generated version before pushing
4. **Test after bumping** - Ensure the new version builds and works correctly

## 🔗 Integration with CI/CD

The version bumping system integrates seamlessly with your GitHub Actions workflow:

1. **Local development**: Use git hooks for automatic version bumping
2. **CI pipeline**: The existing `npm-publish.yml` workflow checks for version changes
3. **Publishing**: Only new versions are published to npm automatically

This ensures a smooth development-to-production pipeline with proper version management.
