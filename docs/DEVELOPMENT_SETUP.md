# 🚀 DES-BOMS Development Setup Guide

This guide will help you set up the DES-BOMS development environment from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (recommended) or npm - [Install pnpm](https://pnpm.io/installation)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/downloads)
- **Visual Studio Code** (recommended) - [Download](https://code.visualstudio.com/)

## 🛠️ Quick Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/DES-BOMS.git
cd DES-BOMS
```

### 2. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 3. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the environment file with your settings
code .env.local
```

### 4. Database Setup
```bash
# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# Seed the database with sample data
pnpm prisma db seed
```

### 5. Start Development Server
```bash
pnpm dev
# or
npm run dev
```

🎉 Your DES-BOMS instance should now be running at `http://localhost:3000`

## 🐳 Docker Setup (Alternative)

If you prefer using Docker:

### Development with Docker
```bash
# Start the development environment
docker-compose up -d

# The application will be available at http://localhost:3000
```

### Production with Docker
```bash
# Build and start production environment
docker-compose -f docker-compose.prod.yml up -d
```

## 🗄️ Database Configuration

### PostgreSQL Setup

1. **Create Database**
```sql
CREATE DATABASE desboms;
CREATE USER desboms_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE desboms TO desboms_user;
```

2. **Update .env.local**
```bash
DATABASE_URL="postgresql://desboms_user:your_password@localhost:5432/desboms"
```

### Using SQLite (Development Only)
For quick development setup, you can use SQLite:
```bash
DATABASE_URL="file:./dev.db"
```

## 🔧 Development Tools

### Recommended VS Code Extensions
- **Prisma** - Database schema management
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Enhanced TypeScript support
- **Tailwind CSS IntelliSense** - CSS class suggestions

### Available Scripts
```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm prisma studio    # Open Prisma Studio (database GUI)
pnpm prisma migrate   # Run migrations
pnpm prisma seed      # Seed database

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript type checking

# Testing
pnpm test             # Run tests (if configured)
```

## 📁 Project Structure Overview

```
DES-BOMS/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── orders/            # Order management pages
│   ├── batches/           # Batch routing pages
│   ├── workstations/      # Shop floor interface
│   └── qc/                # Quality control pages
├── prisma/                # Database schema and migrations
├── types/                 # TypeScript type definitions
├── lib/                   # Utility libraries
├── hooks/                 # Custom React hooks
└── utils/                 # Helper functions
```

## 🔌 QuickBooks Integration Setup (Optional)

1. **Create QuickBooks App**
   - Visit [Intuit Developer](https://developer.intuit.com/)
   - Create a new app
   - Get your Client ID and Secret

2. **Configure Environment**
```bash
QUICKBOOKS_CLIENT_ID="your_client_id"
QUICKBOOKS_CLIENT_SECRET="your_client_secret"
QUICKBOOKS_REDIRECT_URI="http://localhost:3000/quickbooks/success"
QUICKBOOKS_SANDBOX="true"  # Set to false for production
```

## 🚨 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 pnpm dev
```

**Database Connection Issues**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql
```

**Prisma Issues**
```bash
# Reset database (WARNING: This will delete all data)
pnpm prisma migrate reset

# Regenerate Prisma client
pnpm prisma generate
```

**Node Modules Issues**
```bash
# Clear node modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Mantine Components](https://mantine.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Run tests: `pnpm test`
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information
4. Contact the development team

---

Happy coding! 🎉
