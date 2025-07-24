/**
 * Shared type definitions used across the application
 */

// Base entity types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

// Customer types
export interface Customer extends BaseEntity {
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
}

// Status and Priority enums (aligned with DES-BOMS spec: Rush / Standard / Hold)
export type StatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
export type PriorityType = 'HOLD' | 'STANDARD' | 'RUSH';

// Batch types
export interface Batch extends BaseEntity {
  status: StatusType;
  routingSteps: RoutingStep[];
  workstationId?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface RoutingStep extends BaseEntity {
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED' | 'FAILED';
  stepNumber: number;
  workstationId: string;
  estimatedDuration?: number;
  actualDuration?: number;
  notes?: string;
}

// Line Item types
export interface LineItem extends BaseEntity {
  partNumber: string;
  partName: string;
  drawingNumber?: string;
  revisionLevel?: string;
  quantity: number;
  unitPrice?: number;
  batches: Batch[];
}

// Generic pagination types
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// Generic filter types
export interface FilterState<T = any> {
  searchTerm: string;
  status: StatusType | 'ALL';
  priority: PriorityType | 'ALL';
  dateRange?: {
    start: string;
    end: string;
  };
  customFilters?: T;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: PaginationState;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
