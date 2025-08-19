#!/bin/bash
# Linux deployment script for DES-BOMS

set -e

echo "🚀 DES-BOMS Linux Deployment Script"
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Clone or update repository
if [ -d "DES-BOMS" ]; then
    echo "📁 Updating existing repository..."
    cd DES-BOMS
    git pull origin main
else
    echo "📥 Cloning repository..."
    git clone https://github.com/B0OGI3/DES-BOMS.git
    cd DES-BOMS
fi

# Set up environment
echo "🔧 Setting up environment..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️  Please edit .env with your production values:"
    echo "   nano .env"
    echo ""
    echo "Press Enter when ready to continue..."
    read
fi

# Build and start services
echo "🐳 Building and starting services..."
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check health
echo "🩺 Checking application health..."
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Application is healthy!"
    echo ""
    echo "🌐 Access your application at:"
    echo "   http://$(hostname -I | awk '{print $1}'):3000"
    echo ""
    echo "📊 Health check:"
    echo "   http://$(hostname -I | awk '{print $1}'):3000/api/health"
    echo ""
    echo "🔧 Useful commands:"
    echo "   docker-compose -f docker-compose.prod.yml logs -f    # View logs"
    echo "   docker-compose -f docker-compose.prod.yml ps         # Check status"
    echo "   docker-compose -f docker-compose.prod.yml down       # Stop services"
else
    echo "❌ Application health check failed"
    echo "📋 Check logs with: docker-compose -f docker-compose.prod.yml logs"
    exit 1
fi
