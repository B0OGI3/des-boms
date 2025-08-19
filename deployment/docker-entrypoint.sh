#!/bin/sh

echo "Starting application initialization..."

# Function to wait for database
wait_for_db() {
    echo "Waiting for database to be ready..."
    until pnpx prisma db push 2>/dev/null; do
        echo "Database is unavailable - sleeping for 2 seconds"
        sleep 2
    done
    echo "Database connection established!"
}

# Function to setup database
setup_database() {
    echo "Setting up database schema..."
    
    # Check if migrations directory exists, if not initialize
    if [ ! -d "prisma/migrations" ]; then
        echo "No migrations found, creating initial migration..."
        pnpx prisma migrate dev --name init --skip-generate
    else
        echo "Applying existing migrations..."
        pnpx prisma migrate deploy
    fi
    
    echo "Database setup complete!"
}

# Main execution
wait_for_db
setup_database

# Start the application
echo "Starting Next.js application..."
exec pnpm start
