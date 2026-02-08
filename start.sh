#!/bin/bash

# Sigtrip Dashboard Startup Script

echo "🚀 Starting Sigtrip Fundraise Planner Dashboard..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🔧 Starting development server..."
echo ""
echo "The dashboard will be available at:"
echo "  ➜  Local:   http://localhost:5173/"
echo ""

npm run dev
