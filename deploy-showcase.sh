#!/bin/bash

# Deploy ERX Showcase React App to GitHub Pages
# This script builds the React app and deploys it to docs/

set -e

echo "🚀 Deploying ERX Showcase App..."

# Step 1: Build ERX components
echo "📦 Building ERX components..."
npm run build

# Step 2: Build React showcase app
echo "⚛️  Building React showcase app..."
cd showcase-app
npm run build

# Step 3: Build output is in docs/ (configured in vite.config.js)
echo "✅ Build complete!"
echo ""
echo "📁 Output directory: docs/"
echo ""
echo "Next steps:"
echo "1. Review the build in docs/"
echo "2. git add docs/"
echo "3. git commit -m 'chore: update showcase app'"
echo "4. git push"
echo ""
echo "🌐 App will be available at: https://erplora.github.io/erx/"
