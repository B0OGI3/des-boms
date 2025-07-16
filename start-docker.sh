#!/bin/bash

echo "Building and starting Docker containers..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo "Waiting for services to start..."
sleep 10

echo "Checking container status..."
docker-compose ps

echo ""
echo "Setup complete!"
echo "- Database: http://localhost:5432"
echo "- App: http://localhost:3000"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"
