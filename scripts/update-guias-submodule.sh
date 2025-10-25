#!/bin/bash
set -e

# Script to update the aquario-guias submodule to the latest commit

echo "🔄 Updating aquario-guias submodule..."

# Navigate to the project root (in case script is called from elsewhere)
cd "$(dirname "$0")/.."

# Update the submodule to the latest commit from the remote
cd frontend/content/aquario-guias
git fetch origin
git checkout origin/main
cd ../../..
git add frontend/content/aquario-guias

echo "✅ Submodule updated successfully!"
echo ""
echo "Current submodule commit:"
cd frontend/content/aquario-guias
git log -1 --oneline
cd ../../..

echo ""
echo "📝 To commit these changes, run:"
echo "   git add frontend/content/aquario-guias"
echo "   git commit -m 'chore: update aquario-guias submodule'"

