#!/bin/bash
# Production Deployment Script for DES-BOMS

set -e

echo "🚀 Starting DES-BOMS Production Deployment..."

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production file not found!"
    echo "Please copy .env.production.example to .env.production and configure your production values."
    exit 1
fi

# Load environment variables
source .env.production

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose -f docker-compose.prod.yml --env-file .env.production down
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d --build

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 20

# Run database migrations
echo "🔄 Running database migrations..."
docker-compose -f docker-compose.prod.yml --env-file .env.production exec app npx prisma migrate deploy

# Optional: Seed database (uncomment if needed)
# echo "🌱 Seeding database..."
# docker-compose -f docker-compose.prod.yml --env-file .env.production exec app npx prisma db seed

# Check health
echo "🏥 Checking application health..."
sleep 10
docker-compose -f docker-compose.prod.yml --env-file .env.production exec app curl -f http://localhost:3000/api/health

echo "✅ DES-BOMS Production Deployment Complete!"
echo "🌐 Application should be available at: ${NEXT_PUBLIC_APP_URL:-http://localhost:3000}"
echo "📊 Check logs with: docker-compose -f docker-compose.prod.yml --env-file .env.production logs -f"
