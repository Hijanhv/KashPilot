#!/bin/bash

# KashPilot Mobile App Build Script
# This script sets up native mobile app builds using Capacitor

echo "🚀 KashPilot Mobile App Setup"
echo "============================="

# Install mobile dependencies
echo "📱 Installing mobile dependencies..."
npm install @capacitor/android @capacitor/ios

# Add mobile platforms
echo "🔧 Adding mobile platforms..."
npx cap add android
npx cap add ios

# Build web app first
echo "🏗️  Building web app..."
npm run build

# Copy web files to native projects
echo "📋 Syncing files to native projects..."
npx cap sync

echo "✅ Mobile app setup complete!"
echo ""
echo "Next steps:"
echo "1. For Android:"
echo "   npx cap open android"
echo "   - Opens Android Studio to build APK"
echo ""
echo "2. For iOS:"
echo "   npx cap open ios"
echo "   - Opens Xcode to build iOS app"
echo ""
echo "3. For development:"
echo "   npx cap run android"
echo "   npx cap run ios"
echo ""
echo "Note: Requires Android Studio (Android) or Xcode (iOS) to be installed"