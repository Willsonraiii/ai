#!/bin/bash
# AURA — Push to GitHub (FREE deployment)
# 1. Create empty repo at https://github.com/new (DO NOT init with README)
# 2. Copy your repo URL (e.g., https://github.com/YOUR_USERNAME/aura.git)
# 3. Run:  bash PUSH_TO_GITHUB.sh https://github.com/YOUR_USERNAME/aura.git

set -e
REMOTE_URL="$1"
if [ -z "$REMOTE_URL" ]; then
  echo "Usage: bash PUSH_TO_GITHUB.sh https://github.com/YOUR_USERNAME/REPO.git"
  echo ""
  echo "Steps:"
  echo "1. Create empty repo at https://github.com/new  (uncheck 'Add README')"
  echo "2. Run: bash PUSH_TO_GITHUB.sh <your-repo-url>"
  exit 1
fi

echo "→ Adding remote: $REMOTE_URL"
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE_URL"
git branch -M main
echo "→ Pushing to GitHub..."
git push -u origin main
echo ""
echo "✅ Pushed! Now enable Pages:"
echo "   Go to https://github.com/$(echo $REMOTE_URL | sed 's|.*github.com/||; s|\.git||')/settings/pages"
echo "   → Source: Deploy from a branch → Branch: main / root → Save"
echo ""
echo "   Your app will be live at:"
echo "   https://$(echo $REMOTE_URL | sed 's|.*github.com/||; s|/.*||').github.io/$(echo $REMOTE_URL | sed 's|.*github.com/[^/]*/||; s|\.git||')/"
echo ""
echo "   Then on iPhone: open that URL → Share → Add to Home Screen"
