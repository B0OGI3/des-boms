# DES-BOMS

A full-stack batch order management system built for a real manufacturing operation. Manages the complete purchase order lifecycle — from intake through batch routing, workstation confirmations, quality control, and delivery — with QuickBooks Online integration for customer and invoice sync.

## Features

- **Order management** — purchase orders, line items, file attachments (CAD drawings, specs)
- **Batch routing** — create batches from orders, assign routing steps, track workstation progress
- **Workstation interface** — operators confirm steps, log time, and upload photos from the floor
- **Quality control** — pass/fail/rework inspections tied to each batch
- **QuickBooks integration** — bidirectional customer sync, OAuth 2.0, automatic token refresh
- **Production dashboard** — live metrics on active batches, pending QC, and rush orders
- **Automated backups** — daily PostgreSQL dumps with 30-day retention via systemd

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Mantine UI
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL 16
- **Auth/Integration**: QuickBooks OAuth 2.0, Intuit SDK
- **Containerization**: Docker, Docker Compose
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Docker Desktop (or Docker Engine on Linux)
- Node.js 20+
- pnpm

### Option 1: Docker (recommended)

```bash
git clone https://github.com/B0OGI3/des-boms.git
cd des-boms

# Linux/Mac
chmod +x start-docker.sh && ./start-docker.sh

# Windows
start-docker.bat
```

App runs at `http://localhost:3000`

### Option 2: Local development

```bash
pnpm install
docker-compose up db -d           # Start PostgreSQL only
pnpm db:generate && pnpm db:migrate
pnpm dev
```

### Environment variables

Create a `.env.local` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/des_boms"

QB_CLIENT_ID="your_quickbooks_client_id"
QB_CLIENT_SECRET="your_quickbooks_client_secret"
QB_REDIRECT_URI="http://localhost:3000/api/quickbooks/callback"
QB_SANDBOX="true"
```

## Project Structure

```
des-boms/
├── app/
│   ├── api/              # API routes (orders, batches, workstations, qc, quickbooks)
│   ├── orders/           # Order management pages
│   ├── batches/          # Batch routing pages
│   ├── workstations/     # Operator workstation interface
│   └── qc/               # Quality control pages
├── lib/
│   ├── quickbooks.ts     # QuickBooks API integration
│   ├── tokenManager.ts   # OAuth token storage and refresh
│   ├── bomUtils.ts       # Bill of materials utilities
│   └── prisma.ts         # Prisma client singleton
├── prisma/
│   ├── schema.prisma     # Full data model
│   └── migrations/       # Migration history
├── hooks/                # Custom React hooks (filtering, pagination, debounce)
├── types/                # Shared TypeScript definitions
├── deployment/           # Docker and deployment scripts (Linux + Windows)
└── docker-compose.yml
```

## Available Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `pnpm dev`        | Start development server     |
| `pnpm build`      | Build for production         |
| `pnpm db:migrate` | Run Prisma migrations        |
| `pnpm db:studio`  | Open Prisma Studio           |
| `pnpm lint`       | Run ESLint                   |
| `pnpm typecheck`  | Run TypeScript type checking |

## License

MIT
