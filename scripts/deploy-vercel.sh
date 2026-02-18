#!/bin/bash

echo "🚀 KashPilot Vercel Deployment Guide"
echo "═══════════════════════════════════════"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
fi

echo "🔐 Steps to deploy KashPilot to Vercel (FREE):"
echo ""
echo "1. 📝 Sign up at https://vercel.com (free account)"
echo "2. 🔗 Connect your GitHub account"
echo "3. 🚀 Run: vercel --prod"
echo "4. ✅ Follow the prompts:"
echo "   - Project name: kashpilot"
echo "   - Deploy to production: Yes"
echo ""

echo "💡 Alternative - GitHub Auto-Deploy:"
echo "1. 🔐 Login to Vercel with GitHub"
echo "2. 📂 Import your KashPilot repository"  
echo "3. 🚀 Auto-deploy on every push!"
echo ""

echo "🌟 Your site will be live at: https://kashpilot.vercel.app"
echo ""

echo "📋 After deployment, update these URLs:"
echo "🔗 Demo URL for tweet: https://kashpilot.vercel.app"
echo "🔗 Use this in hackathon submissions!"