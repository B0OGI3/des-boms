# DES-BOMS Project Hierarchy Structure

## Overview
This document outlines the proper hierarchy structure implemented throughout the DES-BOMS project to ensure maintainable, scalable, and organized code.

## Directory Structure

```
DES-BOMS/
├── app/                           # Next.js App Router (Frontend & API)
│   ├── components/                # Shared UI Components
│   │   ├── index.ts              # Barrel export for components
│   │   ├── ErrorBoundary.tsx     # Global error handling
│   │   ├── LoadingScreen.tsx     # Loading states
│   │   ├── WorkOrderTracking.tsx # Work order tracking
│   │   └── ui/                   # UI-specific components
│   │       ├── index.ts          # Barrel export for UI components
│   │       ├── FilterBar.tsx     # Filtering components
│   │       ├── Pagination.tsx    # Pagination component
│   │       ├── QuickBooksStatus.tsx
│   │       ├── QuickBooksCustomerSync.tsx
│   │       ├── StatisticsCards.tsx
│   │       └── StyledComponents.tsx
│   │
│   ├── api/                      # API Routes
│   │   ├── batches/              # Batch management endpoints
│   │   ├── bom/                  # Bill of Materials endpoints
│   │   ├── customers/            # Customer management
│   │   ├── orders/               # Order management
│   │   ├── parts/                # Parts management
│   │   ├── quickbooks/           # QuickBooks integration
│   │   └── workstations/         # Workstation management
│   │
│   ├── batches/                  # Batch Management Module
│   │   ├── index.ts              # Barrel export for batches module
│   │   ├── page.tsx              # Batches main page
│   │   ├── components/           # Batch-specific components
│   │   ├── hooks/                # Batch-specific hooks
│   │   ├── types/                # Batch-specific types
│   │   └── utils/                # Batch-specific utilities
│   │
│   ├── orders/                   # Order Management Module
│   │   ├── index.ts              # Barrel export for orders module
│   │   ├── page.tsx              # Orders main page
│   │   ├── components/           # Order-specific components
│   │   ├── hooks/                # Order-specific hooks
│   │   └── utils/                # Order-specific utilities
│   │
│   └── [other-pages]/            # Other page modules
│
├── lib/                          # Core Business Logic & Services
│   ├── index.ts                  # Barrel export for all lib utilities
│   ├── bomUtils.ts               # BOM hierarchy and validation
│   ├── orderUtils.ts             # Order management utilities
│   ├── partNumberGenerator.ts    # Part number generation
│   ├── prisma.ts                 # Database client
│   ├── quickbooks.ts             # QuickBooks integration service
│   ├── tokenManager.ts           # Token management
│   └── tokenScheduler.ts         # Automated token refresh
│
├── types/                        # TypeScript Type Definitions
│   ├── index.ts                  # Barrel export for all types
│   ├── forms.ts                  # Form-related types
│   ├── shared.ts                 # Shared application types
│   ├── prisma.ts                 # Prisma utility types
│   └── node-quickbooks.d.ts      # QuickBooks type declarations
│
├── hooks/                        # Custom React Hooks
│   ├── index.ts                  # Barrel export for all hooks
│   ├── useDebounce.ts            # Debouncing hook
│   ├── useFiltering.ts           # Filtering logic
│   ├── useModal.ts               # Modal management
│   ├── usePageInitialization.ts  # Page initialization
│   └── usePagination.ts          # Pagination logic
│
├── utils/                        # General Utility Functions
│   ├── index.ts                  # Barrel export for utilities
│   ├── accessibilityUtils.ts     # Accessibility helpers
│   ├── dateUtils.ts              # Date formatting utilities
│   └── styleUtils.ts             # Style-related utilities
│
├── prisma/                       # Database Schema & Migrations
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Database seeding
│   └── migrations/               # Database migrations
│
└── generated/                    # Auto-generated Files
    └── prisma/                   # Generated Prisma client
```

## Import Hierarchy Best Practices

### 1. Barrel Exports
Each major directory contains an `index.ts` file that exports all public APIs:
- Simplifies imports
- Provides a single source of truth
- Makes refactoring easier
- Improves code discoverability

### 2. Import Order Convention
```typescript
// 1. External libraries
import { Button, Text } from "@mantine/core";
import { useState, useEffect } from "react";

// 2. Internal barrel exports (preferred)
import { LoadingScreen, ErrorBoundary } from "../components";
import { usePageInitialization } from "../../hooks";
import { OrderType, CustomerType } from "../../types";

// 3. Specific internal imports (when barrel not available)
import { validateOrder } from "../utils/orderValidation";
```

### 3. Module Organization Principles

#### Domain-Driven Structure
- Each major feature (batches, orders, etc.) has its own module
- Components, hooks, types, and utilities are co-located with their domain
- Shared utilities are promoted to the appropriate level

#### Separation of Concerns
- **Components**: UI rendering and user interaction
- **Hooks**: Reusable stateful logic
- **Types**: TypeScript type definitions
- **Utils**: Pure functions and business logic
- **Lib**: Core services and integrations

#### Hierarchy Levels
1. **App Level**: Shared across entire application
2. **Domain Level**: Specific to a feature domain (batches, orders)
3. **Component Level**: Specific to a single component

## API Route Organization

### RESTful Structure
```
/api/
├── /batches/
│   ├── route.ts              # GET /api/batches, POST /api/batches
│   ├── [id]/
│   │   ├── route.ts          # GET /api/batches/[id], PUT, DELETE
│   │   └── routing/
│   │       └── route.ts      # GET /api/batches/[id]/routing
│   └── bulk-update/
│       └── route.ts          # POST /api/batches/bulk-update
```

### Naming Conventions
- Use kebab-case for route segments
- Group related operations in subdirectories
- Keep route files focused on HTTP methods for that resource

## Type Hierarchy

### Shared Types (`types/shared.ts`)
- Application-wide interfaces
- Enums used across modules
- Generic utility types

### Domain-Specific Types
- Co-located with their respective domains
- Extended from shared base types where appropriate

### Generated Types
- Prisma-generated types in `/generated/prisma/`
- Build-time generated types

## Component Hierarchy

### Shared Components (`app/components/`)
- Used across multiple pages/domains
- General-purpose UI components
- Layout components

### Domain Components (`app/[domain]/components/`)
- Specific to a particular domain
- Business logic components
- Domain-specific UI patterns

### UI Components (`app/components/ui/`)
- Pure presentation components
- Reusable design system elements
- No business logic

## Benefits of This Structure

1. **Maintainability**: Clear separation of concerns and logical organization
2. **Scalability**: Easy to add new features without disrupting existing code
3. **Reusability**: Components and utilities are easily discoverable and reusable
4. **Type Safety**: Comprehensive TypeScript coverage with organized type definitions
5. **Developer Experience**: Barrel exports and clear conventions improve productivity
6. **Testing**: Organized structure makes it easier to write focused tests

## Migration Strategy

When updating existing code to follow this hierarchy:

1. Create barrel exports for existing directories
2. Update imports to use barrel exports where possible
3. Move domain-specific code to appropriate domain directories
4. Promote shared utilities to the appropriate level
5. Update documentation and examples

This structure provides a solid foundation for the continued growth and maintenance of the DES-BOMS application.
