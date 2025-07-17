# DES-BOMS (Delivered Engineering Solutions - Batch Order Management System)

## 🎯 What is DES-BOMS?

**DES-BOMS** is a comprehensive **Batch Order Management System** designed specifically for **Delivered Engineering Solutions (DES)** manufacturing operations. The system manages customer orders, batch routing, workstation confirmations, and inspection processes in a modern manufacturing environment.

### � Perfect For Manufacturing Operations:
- **Order Management** - Complete purchase order lifecycle from receipt to delivery
- **Batch Routing** - Sequential workstation routing with real-time tracking
- **Workstation Control** - Operator confirmations and step-by-step processing
- **Quality Control** - Built-in inspection and QC record management
- **Production Monitoring** - Real-time shop floor dashboards and status tracking
- **Document Management** - Drawing files, CAD models, and specification handling

### 🌟 Key Manufacturing Features:
- **Purchase Order Processing** - Customer POs with line items and file attachments
- **Batch Management** - System-generated batch IDs with quantity tracking
- **Sequential Routing** - Step-by-step workstation routing with time estimates
- **Operator Interface** - Login, job queue, and step confirmation system
- **Quality Control** - Inspector records with Pass/Fail/Rework tracking
- **Real-time Dashboards** - Live status monitoring across all workstations
- **Work Travelers** - Printable job routing documentation

---

## 🚀 Tech Stack

- **Frontend**: Next.js 15.4.1 with App Router, React 18, TypeScript
- **UI Library**: Mantine 8.1.3 + TailwindCSS 4.1.11 for modern, responsive design
- **Database**: PostgreSQL 16 with Prisma 6.12.0 ORM for type-safe database operations
- **Containerization**: Docker & Docker Compose for easy deployment
- **Package Manager**: pnpm for fast, efficient dependency management
- **Health Monitoring**: Built-in system health dashboard and API endpoints

## 📋 Prerequisites

- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
- **Node.js 20+** (for local development)
- **pnpm** (recommended package manager)

## 🐳 Quick Start with Docker (Recommended)

### Option 1: Using Helper Scripts
```bash
# Windows
start-docker.bat

# Linux/Mac
chmod +x start-docker.sh
./start-docker.sh
```

### Option 2: Manual Docker Commands
```bash
# Start the full stack
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 🌐 Access Points
- **Application**: http://localhost:3000
- **Database**: localhost:5432
- **API Endpoints**: 
  - http://localhost:3000/api/orders
  - http://localhost:3000/api/batches
  - http://localhost:3000/api/workstations
  - http://localhost:3000/api/qc

## 💻 Local Development Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local for local development
DATABASE_URL="postgresql://desadmin:DES6040@localhost:5432/boms"
```

### 3. Start Database Only
```bash
docker-compose up db -d
```

### 4. Database Operations
```bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# View database in browser
pnpm db:studio
```

### 5. Start Development Server
```bash
pnpm dev
# or use helper script
dev.bat  # Windows only
```

## 📁 Project Structure

```
DES-BOMS/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/               # API endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   └── ColorSchemeProvider.tsx
├── lib/                   # Utility libraries & configurations
│   └── prisma.ts          # Prisma client setup
├── prisma/               # Database schema & migrations
│   └── schema.prisma      # Database schema definition
├── generated/prisma/     # Auto-generated Prisma client
├── public/               # Static assets
├── docker-compose.yml    # Multi-service Docker configuration
├── Dockerfile           # Application container definition
├── tailwind.config.ts   # TailwindCSS configuration
└── package.json         # Dependencies & scripts
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:deploy` | Deploy migrations (production) |
| `pnpm db:studio` | Open Prisma Studio |

## 🗃️ Database Schema

The manufacturing-focused database includes the following main entities:

### Order Management
- **Customer**: Manufacturing customers with billing/shipping addresses
- **PurchaseOrder**: Customer POs with system-generated order IDs
- **OrderLineItem**: Individual parts with drawings and specifications
- **FileAttachment**: CAD files, drawings, and documentation per line item

### Production Management
- **Batch**: Manufacturing batches with system-generated IDs (DES-YYYY-MMDD-###)
- **RoutingStep**: Sequential workstation steps with time estimates
- **Workstation**: Manufacturing stations (LATHE-1, MILL-2, etc.)

### Operator System
- **StepConfirmation**: Operator login, start/end times, and photo uploads
- **QCRecord**: Quality control inspections with Pass/Fail/Rework results

### Status Tracking
- **Order Priority**: Rush / Standard / Hold
- **Batch Status**: Queued / In Progress / Completed / On Hold / Cancelled
- **Step Status**: Pending / In Progress / Completed / Skipped / Failed
- **QC Results**: Pass / Fail / Rework Required

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check container status
docker-compose ps

# View database logs
docker-compose logs db

# Restart database
docker-compose restart db
```

### Build Issues
```bash
# Clean rebuild Docker images
docker-compose build --no-cache

# Remove all volumes and restart
docker-compose down -v
docker-compose up -d
```

### Prisma Issues
```bash
# Regenerate Prisma client
pnpm db:generate

# Reset database schema
docker-compose down -v
docker-compose up -d
pnpm db:migrate
```

### Port Conflicts
If ports 3000 or 5432 are in use:
```bash
# Check what's using the ports
netstat -an | find "3000"
netstat -an | find "5432"

# Stop conflicting services or modify docker-compose.yml
```

## 🔒 Environment Variables

### Development (.env.local)
```env
DATABASE_URL="postgresql://desadmin:DES6040@localhost:5432/boms"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Docker (.env)
```env
DATABASE_URL="postgresql://desadmin:DES6040@db:5432/boms"
POSTGRES_DB=boms
POSTGRES_USER=desadmin
POSTGRES_PASSWORD=DES6040
```

## 🚀 Deployment

### Production Docker Deployment
1. **Build production image:**
   ```bash
   docker build -t des-boms:latest .
   ```

2. **Deploy with production compose:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Cloud Deployment Options
- **Vercel**: Automatic deployment from GitHub
- **Docker Registry**: Push to Docker Hub/GitHub Container Registry
- **VPS/Server**: Direct Docker deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review Docker and Prisma documentation

---

**Status**: ✅ Fully functional Docker/Prisma setup ready for development and deployment!
