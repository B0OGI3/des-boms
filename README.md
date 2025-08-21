# DES-BOMS (Delivered Engineering Solutions - Batch Order Management System)

![Version](https://img.shields.io/badge/version-v0.5.0-blue) ![Status](https://img.shields.io/badge/status-production--ready-green) ![QuickBooks](https://img.shields.io/badge/QuickBooks-integrated-orange)

---

## 📚 Table of Contents

- [What is DES-BOMS?](#-what-is-des-boms)
- [Key Capabilities](#-key-capabilities)
- [🗄️ Database Schema Overview](#️-database-schema-overview)
- [Perfect Project Structure](#️-perfect-project-structure---100-organized)
- [Latest Features](#-latest-features-v050---august-2025)
- [Quick Start](#-quick-start)
- [QuickBooks Integration](#-quickbooks-integration)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [API Endpoints](#-api-endpoints)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)
- [Automated Backup System](#-automated-backup-system)
- [Documentation](#-documentation)
- [Version History](#-version-history)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 What is DES-BOMS?

**DES-BOMS** is a comprehensive **Batch Order Management System** designed for modern manufacturing operations. It provides complete order lifecycle management, AI-powered batch generation, workstation routing, quality control, and enterprise-grade QuickBooks integration.

### ⚡ Key Capabilities

- **📋 Order Management** - Complete purchase order lifecycle from receipt to delivery
- **🤖 AI-Powered Smart Batch Generation** - Intelligent batch sizing with full customization
- **🏭 Workstation Control** - Operator confirmations and step-by-step processing
- **🔍 Quality Control** - Built-in inspection and QC record management
- **📊 Production Monitoring** - Real-time shop floor dashboards and status tracking
- **🔗 QuickBooks Integration** - Enterprise-grade bidirectional customer sync with auto-refresh
- **📁 Document Management** - CAD files, drawings, and specification handling

## 🗄️ Database Schema Overview

### Order Management

- **Customer** - Manufacturing customers with QuickBooks sync
- **PurchaseOrder** - Customer POs with system-generated order IDs
- **OrderLineItem** - Individual parts with drawings and specifications
- **FileAttachment** - CAD files, drawings, and documentation

### Smart Batch Generation

- **Batch** - Manufacturing batches with AI-optimized sizing (DES-YYYY-MMDD-###)
- **RoutingStep** - Sequential workstation steps with time estimates
- **BatchGeneration** - AI-powered optimization parameters

### Production Management

- **Workstation** - Manufacturing stations with capacity tracking
- **StepConfirmation** - Operator login, start/end times, photo uploads
- **QCRecord** - Quality control inspections with Pass/Fail/Rework results

### 🏗️ **Perfect Project Structure** - 100% Organized

![Hierarchy](https://img.shields.io/badge/hierarchy-100%25-brightgreen) ![Organization](https://img.shields.io/badge/organization-100%25-brightgreen) ![Structure](https://img.shields.io/badge/structure-maintained-blue)

- **📁 Clean Directory Organization** - Everything in its proper place
- **🔄 Automated Verification** - Structure checks maintain perfect organization
- **📚 Comprehensive Documentation** - Clear guidelines and maintenance rules
- **🎯 Industry Standards** - Professional-grade project structure
- **🛠️ Developer-Friendly** - Easy navigation and barrel exports

> **Structure Commitment**: This repository maintains 100% hierarchy health and organization compliance. See [Structure Guidelines](./docs/STRUCTURE_MAINTENANCE_GUIDELINES.md) for details.

---

## ✨ Latest Features (v0.5.0) - August 2025

### 🔄 **Enterprise QuickBooks Auto-Refresh System** 🆕

- **Zero-Touch Token Management** - Automatic token refresh on API failures with .env.local updates
- **UI Auto-Fix Integration** - One-click token refresh button in QuickBooks status component
- **Multiple Refresh Methods** - Built-in automatic, UI manual, API endpoints, and scheduled refresh
- **Real-time Status Monitoring** - Live connection status with accurate token validation every 30 seconds
- **Production-Ready Security** - Enterprise-grade token lifecycle management with comprehensive error handling

### 🎨 **Enhanced UI/UX & Code Quality**

- **React Warning Elimination** - Resolved all border property conflicts and React warnings
- **Enhanced Part Editing** - Comprehensive part editing functionality in order management
- **Component Standardization** - Centralized theme system with consistent styling
- **SonarLint Compliance** - All code quality issues resolved with TypeScript best practices

### 🤖 **AI-Powered Smart Batch Generation**

- **Intelligent Batch Sizing** - AI-driven optimal batch size calculation based on machine capacity
- **Complete Customization** - Full control over batch parameters with real-time editing
- **Manufacturing Optimization** - Consider machine setup times, operator efficiency, and material flow

---

## 🚀 Quick Start

### Prerequisites

- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
- **Node.js 20+** (for local development)
- **pnpm** (recommended package manager)

### Option 1: Docker (Recommended)

```bash
# Windows
start-docker.bat

# Linux/Mac
chmod +x start-docker.sh && ./start-docker.sh

# Or manually
docker-compose up -d
```

### Option 2: Local Development

```bash
# Install dependencies
pnpm install

# Start database only
docker-compose up db -d

# Setup database
pnpm db:generate && pnpm db:migrate

# Start development server
pnpm dev
```

### 🌐 Access Points

- **Application**: <http://localhost:3000>
- **Database**: localhost:5432 (Prisma Studio: `pnpm db:studio`)

---

## 🔒 QuickBooks Integration

### 🎯 **Enterprise Auto-Refresh System**

DES-BOMS includes enterprise-grade QuickBooks integration with **zero-touch token management**:

#### ✅ **Automatic Token Refresh** - _Always Active_

- Detects 401 authentication errors automatically
- Refreshes both access and refresh tokens
- Updates `.env.local` file automatically
- Retries original API call seamlessly
- **Zero user intervention required**

#### ✅ **UI Auto-Fix Button** - _One-Click Solution_

- Appears when tokens expire: "QuickBooks Token Expired" → "Auto-Fix" button
- One-click token refresh from Settings page
- Real-time status updates after refresh

#### ✅ **Scheduled Refresh** - _Proactive Management_

- Windows Task Scheduler integration (`refresh-qb-tokens-scheduler.bat`)
- Linux/Mac cron job support (`refresh-qb-tokens.js`)
- Runs every 30 minutes to prevent expiration

### Setup Instructions

#### Quick Setup (Recommended)

1. **Complete OAuth Flow**: Visit your app's QuickBooks auth endpoint
2. **Copy Tokens**: Use provided tokens to update `.env.local`
3. **Auto-Refresh Active**: System automatically manages tokens from this point forward

#### Environment Configuration

```env
# QuickBooks Integration
QB_CLIENT_ID="your_quickbooks_client_id"
QB_CLIENT_SECRET="your_quickbooks_client_secret"
QB_SANDBOX="false"  # Set to true for sandbox testing
QB_REDIRECT_URI="https://yourdomain.com/api/quickbooks/callback"

# OAuth Tokens (auto-updated by refresh system)
QB_ACCESS_TOKEN="auto_refreshed_access_token"
QB_COMPANY_ID="your_company_id"
QB_REFRESH_TOKEN="auto_refreshed_refresh_token"
```

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.4.3 with App Router, React 18, TypeScript
- **UI Library**: Mantine 8.1.3 + TailwindCSS 4.1.11
- **Database**: PostgreSQL 16 with Prisma 6.12.0 ORM
- **QuickBooks**: Intuit OAuth SDK with axios
- **Containerization**: Docker & Docker Compose
- **Package Manager**: pnpm

---

## 📁 Project Structure

```text
DES-BOMS/
├── app/                    # Next.js App Router (Frontend & API)
│   ├── api/               # API endpoints
│   │   ├── quickbooks/    # QuickBooks integration
│   │   ├── orders/        # Order management
│   │   ├── batches/       # Batch management
│   │   └── workstations/  # Workstation control
│   ├── components/        # Shared UI components
│   │   └── ui/           # UI-specific components
│   ├── batches/          # Batch management domain
│   ├── orders/           # Order management domain
│   └── workstations/     # Workstation domain
├── lib/                   # Core business logic & services
│   ├── tokenManager.ts    # QuickBooks token management
│   ├── quickbooks.ts      # QuickBooks service layer
│   ├── bomUtils.ts        # BOM hierarchy utilities
│   └── prisma.ts          # Database client
├── types/                 # TypeScript type definitions
├── hooks/                 # Custom React hooks
├── utils/                 # General utility functions
├── prisma/               # Database schema & migrations
├── scripts/              # Development & maintenance scripts
├── tools/                # Development & debugging tools
├── deployment/           # Deployment & startup scripts
├── config/               # Configuration files (ESLint, Tailwind, etc.)
└── docs/                 # Project documentation
```

---

## 🔧 Available Scripts

| Command                    | Description                             |
| -------------------------- | --------------------------------------- |
| `pnpm dev`                 | Start development server                |
| `pnpm build`               | Build for production                    |
| `pnpm start`               | Start production server                 |
| `pnpm db:generate`         | Generate Prisma client                  |
| `pnpm db:migrate`          | Run database migrations                 |
| `pnpm db:studio`           | Open Prisma Studio                      |
| **Structure Maintenance**  |                                         |
| `pnpm verify-hierarchy`    | ✅ Check code hierarchy (100% health)   |
| `pnpm verify-organization` | ✅ Check file organization (100% score) |
| `pnpm check-structure`     | 🏗️ Complete structure verification      |

---

## 📊 API Endpoints

### QuickBooks Integration

- `GET /api/quickbooks/status` — Real-time connection status with token validation
- `GET /api/quickbooks/validate-token` — Lightweight token validation
- `GET /api/quickbooks/refresh-tokens` — Manual token refresh with .env.local update
- `GET /api/quickbooks/refresh-job` — Background token refresh job
- `POST /api/quickbooks/sync-customers` — Bidirectional customer sync

### Manufacturing Operations

- `POST /api/orders/[id]/generate-batches` — AI-powered batch generation
- `POST /api/orders/[id]/complete` — Order completion workflow
- `GET /api/batches` — Batch management
- `GET /api/workstations` — Workstation tracking
- `GET /api/qc` — Quality control

---

## 🐛 Troubleshooting

### Database Issues

```bash
docker-compose ps                    # Check container status
docker-compose logs db              # View database logs
docker-compose restart db           # Restart database
```

### Build Issues

```bash
docker-compose build --no-cache     # Clean rebuild
docker-compose down -v && docker-compose up -d  # Reset volumes
```

### Port Conflicts

```bash
netstat -an | find "3000"           # Check port usage
netstat -an | find "5432"
```

---

## 🚀 Deployment

### Local Development

Perfect for building and testing features locally with full QuickBooks integration support.

### Production Options

- **🐧 Ubuntu Server**: Complete deployment guide with QuickBooks integration
- **☁️ Cloud**: Vercel, Docker Registry, VPS deployment
- **🔒 Security**: SSL certificates, domain setup, secure token storage
- **💾 Automated Backups**: Enterprise-grade backup system with systemd integration

**📖 [Complete Ubuntu Server Deployment Guide](./UBUNTU_DEPLOYMENT.md)**

---

## 💾 Automated Backup System

### 🎯 **Enterprise-Grade Backup Solution**

DES-BOMS includes a comprehensive backup system designed for Linux server deployment with **zero-maintenance operation**:

#### ✅ **Automatic Daily Backups** - _Set It and Forget It_

- **Daily at 2:00 AM**: PostgreSQL database dump with gzip compression
- **30-day retention**: Automatic cleanup of old backups to manage disk space
- **Systemd integration**: Modern Linux task scheduling with restart resilience
- **Full logging**: Complete audit trail of all backup operations
- **Space efficient**: Compressed backups typically 90% smaller than raw data

#### ✅ **Manual Backup Controls** - _On-Demand Backups_

- **Settings Page Integration**: Create manual backups via web interface
- **Real-time Status**: Live backup progress and completion notifications
- **Backup History**: View recent backups with sizes and timestamps
- **API Endpoints**: Programmatic backup creation and management

#### ✅ **Ubuntu Server Setup** - _One-Time Configuration_

```bash
# Deploy your DES-BOMS application to Ubuntu server
# Run the automated setup script (one-time only)
sudo bash deployment/setup-backup-linux.sh

# Update your database connection (edit once)
sudo nano /etc/systemd/system/des-boms-backup.service

# Test the backup system
sudo systemctl start des-boms-backup.service

# ✅ Done! Backups now run automatically forever
```

### 🔧 **Backup Management Commands**

```bash
# Monitor backup status
sudo systemctl status des-boms-backup.timer

# View backup logs
sudo journalctl -u des-boms-backup.service

# List all backups
ls -la /opt/des-boms/backups/

# Manual backup (anytime)
sudo systemctl start des-boms-backup.service
```

### 📊 **What Gets Backed Up**

- **Complete Database**: All tables, indexes, and data
- **Manufacturing Data**: Orders, batches, workstation records
- **Quality Control**: QC records, inspections, measurements
- **Customer Data**: Customer info, QuickBooks sync data
- **System Configuration**: Settings, routing templates
- **Audit Trail**: Complete operation history

### 🛡️ **Backup Security & Reliability**

- **PostgreSQL pg_dump**: Industry-standard database backup method
- **Compressed Storage**: Gzip compression for efficient storage
- **Proper Permissions**: Secure file permissions and user isolation
- **Error Handling**: Comprehensive error detection and logging
- **Service Monitoring**: Integration with Ubuntu's systemd for reliability

### 🎯 **Perfect for Production**

- **Zero Maintenance**: Set up once, runs automatically forever
- **Server Restart Resilient**: Continues working after Ubuntu reboots
- **Scalable**: Handles databases from MB to GB efficiently
- **Monitoring Ready**: Full integration with system logs and monitoring
- **Enterprise Ready**: Production-tested backup strategy

---

## 📚 Documentation

- **🔄 [QuickBooks Auto-Refresh Guide](./docs/QUICKBOOKS_AUTO_REFRESH.md)** - Complete auto-refresh setup
- **📋 [Development Session Notes](./docs/CHAT_SESSION_SUMMARY.md)** - Detailed technical notes
- **📖 [Development Setup Guide](./docs/DEVELOPMENT_SETUP.md)** - Complete development environment setup
- **🏗️ [Hierarchy Structure Guide](./docs/HIERARCHY_STRUCTURE.md)** - Project organization guidelines
- **🔒 [Security Guidelines](./docs/SECURITY.md)** - Security policies and best practices

---

## 📈 Version History

### v0.5.0 (August 2025) - Enterprise QuickBooks Integration

- 🔄 Enterprise auto-refresh system with zero-touch token management
- 🎯 UI auto-fix integration with one-click token refresh
- 🛡️ Production-ready security with comprehensive error handling
- 🎨 React warning resolution and enhanced part editing
- 📚 Complete documentation and setup guides
- 💾 **Automated backup system with Ubuntu server integration**

### v0.4.0 - Smart Manufacturing & AI Integration

- 🤖 AI-powered smart batch generation
- 📋 Advanced order completion workflow
- 🎨 Production-ready architecture

### v0.3.0 - QuickBooks Integration & Enhanced Batch Management

- 🔗 Complete QuickBooks Online integration
- 🔄 Enhanced batch management system
- 🎨 Modern UI/UX with dark theme

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

**Status**: ✅ Production-ready v0.5.0 with Enterprise QuickBooks Auto-Refresh System!
