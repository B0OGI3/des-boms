// Prisma transaction type (simplified to avoid complex type extraction)
export type PrismaTransaction = any;

// Order with line items and batches
export interface OrderWithLineItems {
  id: string;
  lineItems: LineItemWithBatches[];
  [key: string]: any;
}

export interface LineItemWithBatches {
  id: string;
  batches: BatchWithStatus[];
  [key: string]: any;
}

export interface BatchWithStatus {
  id: string;
  status: string;
  [key: string]: any;
}

// Database record types for specific operations
export interface BatchRecord {
  id: string;
}

export interface RoutingStepRecord {
  id: string;
}

export interface StepRecord {
  id: string;
}
