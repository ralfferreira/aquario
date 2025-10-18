#!/bin/bash

# Quick Backend Startup Script
echo "🚀 Starting Aquário Backend..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "📦 Starting Docker Desktop..."
    open -a Docker
    echo "⏳ Waiting for Docker to start..."
    sleep 10
fi

# Start database
docker-compose up -d

# Wait for database
echo "⏳ Waiting for database..."
sleep 5

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo 'DATABASE_URL="postgresql://postgres:password@localhost:5432/aquario?schema=public"' > .env
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server
echo "🎉 Starting backend server on http://localhost:3001"
npm run dev
