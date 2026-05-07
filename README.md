# des-boms

Manufacturing batch order management system built as a pnpm + Turborepo monorepo. Tracks purchase orders from receipt through production — managing batches, routing steps, work-order items, QC checks, and material usage on the shop floor.

## Stack

| Layer | Tech |
|---|---|
| Monorepo | pnpm workspaces + Turborepo |
| API | NestJS 10, Prisma 6, PostgreSQL |
| Frontend | Vite, React 18, React Router v6, TanStack Query v5 |
| Shared | `@des-boms/shared` — compiled Prisma types + enums |
| Infra | Docker Compose (postgres:16) |

## Project Structure

```
des-boms/
├── apps/
│   ├── api/          # NestJS REST API + WebSocket gateway
│   └── web/          # Vite + React operator/admin UI
├── packages/
│   └── shared/       # Prisma schema, migrations, seed, shared types
├── docker-compose.yml
└── turbo.json
```

## Domain Model

```
Customer → PurchaseOrder → OrderLineItem → Part
                                 ↓
                              Batch ← RoutingSteps (from RoutingTemplate)
                                 ↓
                          WorkOrderItem (one per unit)
                                 ↓
                    WorkOrderStepProgress (per step per item)
                    WorkOrderQualityCheck
                    WorkOrderMaterialUsage
```

- **Customers & Orders** — purchase orders with line items, priorities, and due dates
- **Parts & BOM** — part catalog with versioned BOM revisions and components
- **Routing Templates** — reusable step sequences (CNC → Weld → Assembly → QC → Finish)
- **Batches** — production runs tied to a line item with routing steps and quantity
- **Work Orders** — individual unit tracking through each routing step with operator assignment, time logging, QC, and material usage
- **Workstations** — floor stations with operator sessions and capacity tracking
- **QuickBooks** — sync-ready customer/invoice fields (stub for OAuth integration)

## API Modules

| Module | Routes |
|---|---|
| `customers` | CRUD + search |
| `orders` | CRUD, status transitions |
| `batches` | CRUD, spawn work-order items |
| `parts` | CRUD, filter by type |
| `bom` | BOM revisions + components |
| `routing` | Templates + steps, step confirmations |
| `workstations` | CRUD, operator login/logout |
| `work-orders` | Start/complete steps, record QC + material usage |
| `qc` | QC records by batch/part |
| `quickbooks` | OAuth callback stub |
| `uploads` | File attachment stub |

Real-time floor updates broadcast via a WebSocket gateway on the `manufacturing` namespace.

## Getting Started

**Prerequisites:** Node 22+, pnpm 9+, Docker

```bash
# 1. Start the database
docker compose up -d

# 2. Install dependencies
pnpm install

# 3. Copy and fill in env
cp .env.example .env

# 4. Run migrations + seed
cd packages/shared
pnpm db:migrate
pnpm db:seed

# 5. Build shared package
pnpm build

# 6. Start both apps
cd ../..
pnpm dev
```

API runs on `http://localhost:3001`, web on `http://localhost:5173`.

## Environment Variables

```env
DATABASE_URL=postgresql://desadmin:postgres@localhost:5432/boms
POSTGRES_USER=desadmin
POSTGRES_PASSWORD=postgres
POSTGRES_DB=boms
CORS_ORIGIN=http://localhost:5173
PORT=3001
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start API + web in parallel |
| `pnpm build` | Build all packages |
| `pnpm -F @des-boms/shared db:migrate` | Run Prisma migrations |
| `pnpm -F @des-boms/shared db:seed` | Seed dev data |
| `pnpm -F @des-boms/shared db:studio` | Open Prisma Studio |
