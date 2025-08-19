@echo off
echo Setting up development environment...

echo Installing dependencies...
pnpm install

echo Generating Prisma client...
pnpm db:generate

echo Starting development server...
echo Note: Make sure PostgreSQL is running on localhost:5432
echo Database should be: postgresql://desadmin:DES6040@localhost:5432/boms
echo.
pnpm dev
