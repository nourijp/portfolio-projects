#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
SOURCE_DIR="$REPO_ROOT/_source"
OUT_DIR="$SOURCE_DIR/out"

echo "==> Building Next.js static export..."
cd "$SOURCE_DIR"
npm run build

echo "==> Syncing output files to repo root..."
cd "$REPO_ROOT"
rsync -avz --delete \
  --exclude='.git' \
  --exclude='_source' \
  --exclude='CNAME' \
  --exclude='.gitignore' \
  --exclude='deploy.sh' \
  "$OUT_DIR/" ./

echo "==> Restoring .gitignore and CNAME..."
cat > .gitignore << 'EOF'
.DS_Store
*.log
node_modules/
_source/node_modules/
_source/.next/
EOF

echo "==> Done. Run 'git add . && git commit && git push' to deploy."
