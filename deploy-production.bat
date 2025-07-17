@echo off
REM Production Deployment Script for DES-BOMS (Windows)

echo 🚀 Starting DES-BOMS Production Deployment...

REM Check if .env.production exists
if not exist .env.production (
    echo ❌ Error: .env.production file not found!
    echo Please copy .env.production.example to .env.production and configure your production values.
    pause
    exit /b 1
)

REM Pull latest changes
echo 📥 Pulling latest changes...
git pull origin main

REM Build and start containers
echo 🔨 Building and starting containers...
docker-compose -f docker-compose.prod.yml --env-file .env.production down
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d --build

REM Wait for database to be ready
echo ⏳ Waiting for database to be ready...
timeout /t 20 /nobreak > nul

REM Run database migrations
echo 🔄 Running database migrations...
docker-compose -f docker-compose.prod.yml --env-file .env.production exec app npx prisma migrate deploy

REM Optional: Seed database (uncomment if needed)
REM echo 🌱 Seeding database...
REM docker-compose -f docker-compose.prod.yml --env-file .env.production exec app npx prisma db seed

REM Check health
echo 🏥 Checking application health...
timeout /t 10 /nobreak > nul
docker-compose -f docker-compose.prod.yml --env-file .env.production exec app curl -f http://localhost:3000/api/health

echo ✅ DES-BOMS Production Deployment Complete!
echo 🌐 Application should be available at: http://localhost:3000
echo 📊 Check logs with: docker-compose -f docker-compose.prod.yml --env-file .env.production logs -f
pause
