#!/bin/bash

# Prisma Migration Script
# Automatically validates, formats, migrates, and generates types

set -e  # Exit on any error

echo "🔄 Starting Prisma migration process..."

# Check if we're in the backend directory
if [ ! -f "package.json" ] || [ ! -d "prisma" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

# Step 1: Validate schema
echo "✅ Validating schema..."
if ! npx prisma validate; then
    echo "❌ Schema validation failed!"
    exit 1
fi

# Step 2: Format schema (only if needed)
echo "🎨 Formatting schema..."
npx prisma format

# Step 3: Check migration status
echo "📊 Checking migration status..."
npx prisma migrate status

# Step 4: Run migrations
echo "🚀 Running migrations..."
npx prisma migrate dev

# Step 5: Generate client
echo "🔧 Generating Prisma client..."
npx prisma generate

echo "✅ Migration process completed successfully!"
echo ""
echo "📋 What was done:"
echo "   ✅ Schema validated"
echo "   ✅ Schema formatted"
echo "   ✅ Migrations applied"
echo "   ✅ Types generated"
echo ""
echo "🎉 Your database and types are now up to date!"
