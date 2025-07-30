# DES-BOMS (Delivered Engineering Solutions - Batch Order Management System)

## 🎯 What is DES-BOMS?

**DES-BOMS** is a comprehensive **Batch Order Management System** designed specifically for **Delivered Engineering Solutions (DES)** manufacturing operations. The system manages customer orders, batch routing, workstation confirmations, and inspection processes in a modern manufacturing environment.

### ⚙️ Perfect For Manufacturing Operations:
- **Order Management** - Complete purchase order lifecycle from receipt to delivery
- **Batch Routing** - Sequential workstation routing with real-time tracking
- **Workstation Control** - Operator confirmations and step-by-step processing
- **Quality Control** - Built-in inspection and QC record management
- **Production Monitoring** - Real-time shop floor dashboards and status tracking
- **Document Management** - Drawing files, CAD models, and specification handling
- **QuickBooks Integration** - Bidirectional customer sync with QuickBooks Online

### 🌟 Key Manufacturing Features:
- **Purchase Order Processing** - Customer POs with line items and file attachments
- **Batch Management** - System-generated batch IDs with quantity tracking
- **Sequential Routing** - Step-by-step workstation routing with time estimates
- **Operator Interface** - Login, job queue, and step confirmation system
- **Quality Control** - Inspector records with Pass/Fail/Rework tracking
- **Real-time Dashboards** - Live status monitoring across all workstations
- **Work Travelers** - Printable job routing documentation

## ✨ Latest Features (v0.3.0)

### 🔗 QuickBooks Online Integration
- **Bidirectional Customer Sync** - Real-time customer synchronization with QuickBooks Online
- **OAuth 2.0 Authentication** - Secure QuickBooks authorization with token management
- **Automatic Sync** - Customer creation automatically syncs to QuickBooks
- **Sync Status Tracking** - Monitor sync status and handle errors gracefully
- **Production Ready** - Works with both sandbox and production QuickBooks environments

### 🔄 Complete Batch Management System
- **Enhanced Search & Filtering** - Database-driven autocomplete with smart suggestions
- **Bulk Operations** - Multi-select batches for priority updates, status changes, and deletion
- **Real-time Updates** - Live batch status monitoring with smart notifications
- **Work Traveler Generation** - Print-optimized routing documents with QR codes
- **Progress Tracking** - Visual completion percentages and step-by-step routing
- **Priority Management** - Rush / Standard / Hold classifications with color coding

### 🎨 Modern UI/UX
- **Dark Theme** - Glass-morphism design optimized for manufacturing environments  
- **Mobile Responsive** - Full functionality on tablets and mobile devices
- **Loading States** - Skeleton screens for smooth user experience
- **Error Handling** - Comprehensive error boundaries with retry logic
- **Accessibility** - WCAG 2.1 AA compliant for all users

---

## 🚀 Tech Stack

- **Frontend**: Next.js 15.4.3 with App Router, React 18, TypeScript
- **UI Library**: Mantine 8.1.3 + TailwindCSS 4.1.11 for modern, responsive design
- **Database**: PostgreSQL 16 with Prisma 6.12.0 ORM for type-safe database operations
- **QuickBooks Integration**: Intuit OAuth SDK with axios for API communication
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
  - http://localhost:3000/api/customers
  - http://localhost:3000/api/quickbooks/status

## 🔗 QuickBooks Integration Setup

### Prerequisites
1. **QuickBooks Developer Account** - Sign up at https://developer.intuit.com
2. **Create QuickBooks App** - Set up your app in the developer console
3. **Get API Keys** - Consumer Key and Consumer Secret from your app

### Environment Configuration
Add these variables to your `.env.local` file:

```env
# QuickBooks Integration
QB_CONSUMER_KEY="your_quickbooks_consumer_key"
QB_CONSUMER_SECRET="your_quickbooks_consumer_secret"
QB_SANDBOX="true"  # Set to false for production
QB_REDIRECT_URI="http://localhost:3000/api/quickbooks/callback"

# OAuth Tokens (set after authorization)
QB_ACCESS_TOKEN=""
QB_COMPANY_ID=""
```

### OAuth Authorization Flow
1. **Start OAuth**: Visit http://localhost:3000/api/quickbooks/auth
2. **Authorize**: Sign in to QuickBooks and authorize your app
3. **Get Tokens**: Copy the tokens from the success page
4. **Update Environment**: Add tokens to your `.env.local` file

### Testing Integration
1. **Check Status**: http://localhost:3000/api/quickbooks/status
2. **Create Customer**: Add a new customer in Orders page
3. **Verify Sync**: Customer should appear in QuickBooks

### Production Deployment
For production deployment with QuickBooks integration, see the complete guide:
📖 **[Ubuntu Server Deployment Guide](./UBUNTU_DEPLOYMENT.md)**

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

# Add QuickBooks credentials (optional for basic development)
QB_CONSUMER_KEY="your_quickbooks_consumer_key"
QB_CONSUMER_SECRET="your_quickbooks_consumer_secret"
QB_SANDBOX="true"
QB_REDIRECT_URI="http://localhost:3000/api/quickbooks/callback"
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
│   │   ├── quickbooks/    # QuickBooks integration endpoints
│   │   ├── customers/     # Customer management API
│   │   ├── orders/        # Order management API
│   │   └── batches/       # Batch management API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   └── ColorSchemeProvider.tsx
├── lib/                   # Utility libraries & configurations
│   ├── prisma.ts          # Prisma client setup
│   └── quickbooks.ts      # QuickBooks service layer
├── prisma/               # Database schema & migrations
│   └── schema.prisma      # Database schema definition
├── generated/prisma/     # Auto-generated Prisma client
├── public/               # Static assets
├── scripts/              # Utility scripts
│   └── reset-for-quickbooks.ts # Database cleanup script
├── docker-compose.yml    # Multi-service Docker configuration
├── Dockerfile           # Application container definition
├── UBUNTU_DEPLOYMENT.md # Complete Ubuntu deployment guide
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
- **Customer**: Manufacturing customers with billing/shipping addresses + QuickBooks sync
- **PurchaseOrder**: Customer POs with system-generated order IDs
- **OrderLineItem**: Individual parts with drawings and specifications
- **FileAttachment**: CAD files, drawings, and documentation per line item

### QuickBooks Integration
- **Customer Sync**: Bidirectional synchronization with QuickBooks Online
- **OAuth Integration**: Secure authentication with QuickBooks API
- **Sync Status Tracking**: Monitor sync status and handle errors
- **Real-time Updates**: Automatic customer creation sync

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
# Database
DATABASE_URL="postgresql://desadmin:DES6040@localhost:5432/boms"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# QuickBooks Integration (Development)
QB_CONSUMER_KEY="your_quickbooks_consumer_key"
QB_CONSUMER_SECRET="your_quickbooks_consumer_secret"
QB_SANDBOX="true"
QB_REDIRECT_URI="http://localhost:3000/api/quickbooks/callback"
QB_ACCESS_TOKEN=""
QB_COMPANY_ID=""
```

### Docker (.env)
```env
DATABASE_URL="postgresql://desadmin:DES6040@db:5432/boms"
POSTGRES_DB=boms
POSTGRES_USER=desadmin
POSTGRES_PASSWORD=DES6040
```

### Production (.env)
```env
# Database
DATABASE_URL="postgresql://desadmin:DES6040@localhost:5432/boms"

# QuickBooks Integration (Production)
QB_CONSUMER_KEY="your_production_qb_key"
QB_CONSUMER_SECRET="your_production_qb_secret"
QB_SANDBOX="false"
QB_REDIRECT_URI="https://yourdomain.com/api/quickbooks/callback"
QB_ACCESS_TOKEN="your_production_access_token"
QB_COMPANY_ID="your_production_company_id"
```

## 🚀 Deployment

### Local Development
Perfect for building and testing features locally with full QuickBooks integration support.

### Production Deployment Options

#### 🐧 Ubuntu Server (Recommended)
Complete deployment guide with QuickBooks integration, ngrok tunneling, SSL certificates, and production configuration:

**📖 [Complete Ubuntu Server Deployment Guide](./UBUNTU_DEPLOYMENT.md)**

#### ☁️ Cloud Deployment
- **Vercel**: Automatic deployment from GitHub (requires external database)
- **Docker Registry**: Push to Docker Hub/GitHub Container Registry
- **VPS/Server**: Direct Docker deployment with reverse proxy

### QuickBooks Integration in Production
- **Option A**: Use ngrok for secure tunneling (recommended for local servers)
- **Option B**: Deploy with public domain and SSL certificate
- **OAuth Flow**: Complete authorization in production environment
- **Token Management**: Secure storage of access tokens and refresh logic

For detailed production setup including QuickBooks configuration, SSL certificates, domain setup, and security considerations, see the **[Ubuntu Deployment Guide](./UBUNTU_DEPLOYMENT.md)**.

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

**Status**: ✅ Production-ready with QuickBooks Online integration and comprehensive Ubuntu deployment guide!

## 🔗 Additional Resources

- 📖 **[Ubuntu Server Deployment Guide](./UBUNTU_DEPLOYMENT.md)** - Complete production deployment
- 🔧 **[QuickBooks Developer Console](https://developer.intuit.com/)** - Manage your QuickBooks app
- 📚 **[Prisma Documentation](https://www.prisma.io/docs)** - Database and ORM guidance
- 🐳 **[Docker Documentation](https://docs.docker.com/)** - Containerization reference
- ⚡ **[Next.js Documentation](https://nextjs.org/docs)** - Framework documentation

## 🔄 Automatic Customer Sync & Cleanup

- On every Orders page load, DES-BOMS automatically syncs customers with QuickBooks Online.
- Any customer that exists in your local database but is no longer present in QuickBooks will be deleted immediately (no grace period).
- This ensures your local customer list always matches QuickBooks after each sync.
- The sync is triggered by a POST request to `/api/quickbooks/sync-customers`.
- You do not need to manually trigger this; it is handled automatically by the frontend.

### API Endpoints (QuickBooks)
- `POST /api/quickbooks/sync-customers` — Syncs all customers from QuickBooks, upserts them locally, and deletes any local customers not in QuickBooks.
- `GET /api/quickbooks/status` — Returns QuickBooks connection status.

---
