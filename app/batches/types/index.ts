// Types for Batch Management System
export type BatchPriority = 'RUSH' | 'STANDARD' | 'HOLD';
export type BatchStatus = 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';

export interface Batch {
  id: string;
  batchId: string; // Format: DES-YYYY-MMDD-###
  lineItemId: string;
  quantity: number;
  startDate: string | null;
  estimatedCompletion: string | null;
  actualCompletion: string | null;
  priority: BatchPriority;
  status: BatchStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  lineItem: {
    id: string;
    partId: string;
    quantity: number;
    part: {
      id: string;
      partNumber: string;
      partName: string;
      partType: 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
      drawingNumber: string | null;
      revisionLevel: string | null;
      description: string | null;
      materialSpec: string | null;
      unitOfMeasure: string | null;
      standardCost: string | null;
      leadTime: number | null;
    };
    purchaseOrder: {
      id: string;
      systemOrderId: string;
      poNumber: string;
      customer: {
        id: string;
        name: string;
      };
    };
  };
  routingSteps: RoutingStep[];
  qcRecords: QCRecord[];
}

export interface RoutingStep {
  id: string;
  batchId: string;
  stepNumber: number;
  workstationId: string;
  description: string;
  required: boolean;
  estimatedTime: number | null; // minutes
  notes: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
  
  // Relations
  workstation: {
    id: string;
    name: string;
    description: string | null;
    active: boolean;
  };
  confirmations: StepConfirmation[];
}

export interface StepConfirmation {
  id: string;
  stepId: string;
  workstationId: string;
  operatorName: string;
  operatorId: string | null;
  startTime: string | null;
  endTime: string | null;
  notes: string | null;
  photoUrl: string | null;
  flagged: boolean;
  status: 'STARTED' | 'COMPLETED' | 'PAUSED' | 'FLAGGED';
  createdAt: string;
  updatedAt: string;
}

export interface QCRecord {
  id: string;
  batchId: string;
  inspector: string;
  inspectionDate: string;
  result: 'PASS' | 'FAIL' | 'REWORK_REQUIRED';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Workstation {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Form interfaces
export interface BatchFormInput {
  lineItemId: string;
  quantity: number;
  priority: 'RUSH' | 'STANDARD' | 'HOLD';
  estimatedCompletion?: string;
  notes?: string;
  routingSteps: RoutingStepInput[];
}

export interface RoutingStepInput {
  workstationId: string;
  description: string;
  required: boolean;
  estimatedTime?: number;
  notes?: string;
}

// Filter types
export type BatchStatusFilter = 'ALL' | 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
export type BatchPriorityFilter = 'ALL' | 'RUSH' | 'STANDARD' | 'HOLD';

// Search and filtering
export interface BatchSearchParams {
  search?: string;
  status?: BatchStatusFilter;
  priority?: BatchPriorityFilter;
  workstation?: string;
  lineItemId?: string;
  overdue?: string;
}

export interface BatchSearchResult {
  batches: Batch[];
  totalCount: number;
  hasActiveFilters: boolean;
}

// Form input types
export interface NewBatchInput {
  lineItemId: string;
  quantity: number;
  priority: BatchPriority;
  notes: string;
  routingTemplateId: string;
  estimatedCompletion: string;
}

export interface EditBatchInput {
  quantity?: number;
  priority?: BatchPriority;
  notes?: string;
  estimatedCompletion?: string;
}
