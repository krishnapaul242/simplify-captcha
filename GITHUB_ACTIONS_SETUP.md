# GitHub Actions Setup for NPM Publishing

This repository includes a GitHub Action that automatically publishes the package to npm when changes are pushed to the main branch.

## Setup Requirements

### 1. NPM Token Configuration

To enable automatic publishing, you need to configure an NPM access token:

1. **Generate an NPM Token:**
   - Go to [npmjs.com](https://www.npmjs.com/) and log in
   - Go to "Access Tokens" in your profile settings
   - Click "Generate New Token"
   - Choose "Automation" type for CI/CD use
   - Copy the generated token

2. **Add Token to GitHub Secrets:**
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your NPM token
   - Click "Add secret"

### 2. How the Workflow Works

The workflow (`/.github/workflows/npm-publish.yml`) will:

1. **Trigger:** Runs automatically when code is pushed to the `main` branch
2. **Version Check:** Compares the version in `package.json` with what's published on npm
3. **Build & Test:** Runs linting and builds the library
4. **Publish:** If the version is new, publishes to npm
5. **Release:** Creates a GitHub release with the version tag
6. **Skip:** If version already exists, skips publishing with a helpful message

### 3. Publishing a New Version

To publish a new version:

1. **Update Version:**

   ```bash
   # Increment patch version (1.1.1 → 1.1.2)
   npm version patch
   
   # Or increment minor version (1.1.1 → 1.2.0)
   npm version minor
   
   # Or increment major version (1.1.1 → 2.0.0)
   npm version major
   ```

2. **Push to Main:**

   ```bash
   git push origin main --tags
   ```

3. **Automatic Process:**
   - GitHub Action detects the new version
   - Builds and tests the package
   - Publishes to npm
   - Creates a GitHub release

### 4. Manual Triggering

You can also manually trigger the workflow:

- Go to Actions tab in your GitHub repository
- Select "Publish to NPM" workflow
- Click "Run workflow"

## Security Notes

- The NPM token is stored securely as a GitHub secret
- The workflow only publishes when the version number changes
- All builds are tested before publishing
- The workflow creates a permanent record via GitHub releases

## Troubleshooting

### Common Issues

1. **"NPM_TOKEN not found"**
   - Ensure you've added the NPM_TOKEN secret in repository settings
   - Verify the token has publish permissions

2. **"Version already exists"**
   - Update the version number in package.json
   - Use `npm version patch/minor/major` to increment properly

3. **"Build failed"**
   - Check that all dependencies are properly listed
   - Ensure the build passes locally with `npm run build`

4. **"Permission denied"**
   - Verify your NPM token has automation/publish permissions
   - Check that you're a maintainer of the package on npm
