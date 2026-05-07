import type {
  Customer,
  PurchaseOrder,
  OrderLineItem,
  Part,
  BOMRevision,
  BOMComponent,
  Batch,
  RoutingStep,
  Workstation,
  WorkstationCapacity,
  WorkstationOperator,
  QCRecord,
  WorkOrderItem,
  WorkOrderStepProgress,
  WorkOrderQualityCheck,
  WorkOrderMaterialUsage,
  FileAttachment,
} from '@des-boms/shared';

// Response types that include the relations each endpoint returns

export type PartSummary = Part & {
  recommendedRoutingTemplate: { id: string; name: string } | null;
};

export type LineItemWithPart = OrderLineItem & {
  part: Part;
  bomRevision: (BOMRevision & { components: (BOMComponent & { childPart: Part })[] }) | null;
  batches: Batch[];
  fileAttachments: FileAttachment[];
};

export type OrderSummary = PurchaseOrder & {
  customer: Customer;
  lineItems: LineItemWithPart[];
};

export type BatchSummary = Batch & {
  lineItem: LineItemWithPart & {
    purchaseOrder: PurchaseOrder & { customer: Customer };
  };
  routingSteps: (RoutingStep & { workstation: Workstation })[];
  workOrderItems: WorkOrderItem[];
  qcRecords: QCRecord[];
};

export type WorkstationWithOperators = Workstation & {
  currentOperators: WorkstationOperator[];
  capacity: WorkstationCapacity | null;
};

export type CustomerWithOrderCount = Customer & {
  _count: { purchaseOrders: number };
};

export type WorkOrderItemDetail = WorkOrderItem & {
  batch: Batch & { lineItem: OrderLineItem & { part: Part } };
  stepProgress: (WorkOrderStepProgress & {
    routingStep: RoutingStep & { workstation: Workstation };
  })[];
  qualityChecks: WorkOrderQualityCheck[];
  materialUsage: (WorkOrderMaterialUsage & { materialPart: Part; routingStep: RoutingStep | null })[];
};
