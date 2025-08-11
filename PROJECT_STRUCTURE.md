# DES-BOMS Project Structure

This document outlines the complete directory structure and organization of the DES-BOMS (Delivered Engineering Solutions - Batch Order Management System) project.

## 📁 Root Directory Structure

```
DES-BOMS/
├── 📄 Configuration Files
│   ├── package.json              # Project dependencies and scripts
│   ├── pnpm-lock.yaml           # Package manager lock file
│   ├── tsconfig.json            # TypeScript configuration
│   ├── next.config.ts           # Next.js configuration
│   ├── tailwind.config.ts       # Tailwind CSS configuration
│   ├── postcss.config.mjs       # PostCSS configuration
│   ├── eslint.config.mjs        # ESLint configuration
│   └── .gitignore               # Git ignore rules
│
├── 🌍 Environment & Deployment
│   ├── .env.example             # Environment variables template
│   ├── .env.production.example  # Production environment template
│   ├── Dockerfile               # Docker container configuration
│   ├── docker-compose.yml       # Development Docker setup
│   ├── docker-compose.prod.yml  # Production Docker setup
│   ├── docker-entrypoint.sh     # Docker startup script
│   ├── deploy-production.sh     # Linux deployment script
│   ├── deploy-production.bat    # Windows deployment script
│   ├── start-docker.sh          # Linux Docker startup
│   └── start-docker.bat         # Windows Docker startup
│
├── 📚 Documentation
│   ├── README.md                # Main project documentation
│   ├── CHANGELOG.md             # Version history and changes
│   ├── DEPLOYMENT.md            # Deployment instructions
│   ├── SECURITY.md              # Security guidelines
│   ├── LICENSE                  # Project license
│   ├── BATCH_MANAGEMENT_RELEASE.md    # Batch management features
│   ├── BATCH_UX_IMPROVEMENTS.md       # UX improvements log
│   ├── BUILD_NOTES.md           # Build and development notes
│   ├── PRODUCTION_READY.md      # Production readiness checklist
│   └── UBUNTU_DEPLOYMENT.md     # Ubuntu-specific deployment
│
├── 🗄️ Database & Data
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema definition
│   │   ├── seed.ts              # Database seeding script
│   │   └── migrations/          # Database migration files
│   ├── generated/               # Auto-generated Prisma client
│   └── scripts/                 # Database utility scripts
│
└── 📱 Application Code
    ├── app/                     # Next.js 14 App Router
    ├── components/              # Shared React components
    ├── hooks/                   # Custom React hooks
    ├── lib/                     # Utility libraries
    ├── types/                   # TypeScript type definitions
    ├── utils/                   # Utility functions
    └── public/                  # Static assets
```

## 🏗️ Application Structure (`app/` directory)

```
app/
├── 📄 Root Files
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Homepage (Dashboard)
│   ├── not-found.tsx            # 404 error page
│   ├── globals.css              # Global styles
│   └── favicon.ico              # Site favicon
│
├── 🌐 API Routes (`api/`)
│   ├── analytics/               # Analytics endpoints
│   ├── batches/                 # Batch management APIs
│   ├── confirmations/           # Step confirmation APIs
│   ├── customers/               # Customer management APIs
│   ├── dashboard/               # Dashboard data APIs
│   ├── health/                  # System health checks
│   ├── orders/                  # Order management APIs
│   ├── qc/                      # Quality control APIs
│   ├── quickbooks/              # QuickBooks integration
│   ├── routing-steps/           # Routing step APIs
│   ├── routing-templates/       # Routing template APIs
│   ├── search/                  # Search functionality
│   ├── stats/                   # Statistics APIs
│   ├── workstations/            # Workstation management
│   └── ws/                      # WebSocket endpoints
│
├── 📋 Feature Pages
│   ├── orders/                  # Customer order management
│   │   ├── page.tsx            # Orders list page
│   │   ├── components/         # Order-specific components
│   │   ├── hooks/              # Order-related hooks
│   │   ├── types/              # Order type definitions
│   │   └── utils/              # Order utility functions
│   │
│   ├── batches/                 # Batch routing management
│   │   ├── page.tsx            # Batches list page
│   │   ├── [id]/               # Individual batch pages
│   │   ├── components/         # Batch-specific components
│   │   ├── hooks/              # Batch-related hooks
│   │   ├── types/              # Batch type definitions
│   │   └── utils/              # Batch utility functions
│   │
│   ├── workstations/            # Shop floor workstations
│   │   └── page.tsx            # Workstation management page
│   │
│   ├── qc/                      # Quality control
│   │   └── page.tsx            # QC inspection page
│   │
│   ├── quickbooks/              # QuickBooks integration
│   │   ├── success/            # OAuth success page
│   │   └── error/              # OAuth error page
│   │
│   ├── reports/                 # Reporting and analytics
│   │   └── page.tsx            # Reports dashboard
│   │
│   ├── settings/                # System settings
│   │   └── page.tsx            # Settings page
│   │
│   └── health/                  # System health monitoring
│       └── page.tsx            # Health check page
│
├── 🧩 Shared Components (`components/`)
│   ├── ErrorBoundary.tsx       # Error handling component
│   └── ui/                     # Reusable UI components
│
├── 📄 Legal & Compliance
│   ├── privacy/                 # Privacy policy
│   ├── eula/                   # End user license agreement
│   └── analytics/              # Analytics configuration
```

## 🔧 Supporting Directories

### `/lib` - Core Libraries
```
lib/
├── prisma.ts                   # Database client configuration
├── quickbooks.ts               # QuickBooks API integration
└── orderUtils.ts               # Order processing utilities
```

### `/types` - TypeScript Definitions
```
types/
├── forms.ts                    # Form type definitions
├── prisma.ts                   # Database type extensions
├── shared.ts                   # Shared type definitions
└── node-quickbooks.d.ts        # QuickBooks type declarations
```

### `/utils` - Utility Functions
```
utils/
├── accessibilityUtils.ts       # Accessibility helpers
├── dateUtils.ts                # Date formatting and manipulation
└── styleUtils.ts               # Styling utility functions
```

### `/hooks` - Custom React Hooks
```
hooks/
├── useDebounce.ts              # Debouncing hook
├── useFiltering.ts             # Data filtering hook
├── useModal.ts                 # Modal state management
└── usePagination.ts            # Pagination logic
```

### `/public` - Static Assets
```
public/
├── file.svg                    # File icon
├── globe.svg                   # Globe icon
├── next.svg                    # Next.js logo
└── window.svg                  # Window icon
```

## 🏷️ File Naming Conventions

### Components
- **PascalCase**: `OrderDetailsModal.tsx`, `BatchStatusCard.tsx`
- **Descriptive**: Names should clearly indicate component purpose

### Pages
- **lowercase**: `page.tsx` (App Router convention)
- **Dynamic routes**: `[id]/page.tsx`, `[...slug]/page.tsx`

### API Routes
- **lowercase**: `route.ts` (App Router convention)
- **RESTful**: Follows REST conventions for endpoints

### Utilities & Hooks
- **camelCase**: `useOrderSearch.ts`, `dateUtils.ts`
- **Descriptive**: Clear indication of functionality

## 🔐 Environment Configuration

### Development
- `.env.local` - Local development variables
- `.env.example` - Template for environment setup

### Production
- `.env.production` - Production environment variables
- `.env.production.example` - Production template

### Required Environment Variables
```bash
# Database
DATABASE_URL="postgresql://..."

# QuickBooks Integration
QUICKBOOKS_CLIENT_ID="..."
QUICKBOOKS_CLIENT_SECRET="..."
QUICKBOOKS_REDIRECT_URI="..."

# Application
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="..."
```

## 📋 Development Standards

### Code Organization
1. **Feature-based structure** in pages
2. **Shared components** in `/components`
3. **Type safety** with TypeScript
4. **Consistent naming** conventions
5. **Clear separation** of concerns

### File Structure Rules
1. Each feature page has its own directory
2. Components, hooks, types, and utils are co-located with features
3. Shared code is in root-level directories
4. API routes mirror the application structure

### Documentation Standards
1. **JSDoc comments** for complex functions
2. **README files** for major features
3. **Type documentation** in interfaces
4. **API documentation** in route files

## 🚀 Deployment Structure

### Docker
- Multi-stage builds for optimization
- Separate development and production configurations
- Health checks and proper logging

### Scripts
- Cross-platform deployment scripts
- Database migration automation
- Environment-specific configurations

This structure ensures maintainability, scalability, and clear organization for the DES-BOMS manufacturing system.
