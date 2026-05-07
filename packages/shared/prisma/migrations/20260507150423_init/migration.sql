-- CreateEnum
CREATE TYPE "PartType" AS ENUM ('FINISHED', 'SEMI_FINISHED', 'RAW_MATERIAL');

-- CreateEnum
CREATE TYPE "OrderPriority" AS ENUM ('RUSH', 'STANDARD', 'HOLD');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'SHIPPED', 'CANCELLED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "BatchPriority" AS ENUM ('RUSH', 'STANDARD', 'HOLD');

-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('QUEUED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED');

-- CreateEnum
CREATE TYPE "StepStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED', 'FAILED');

-- CreateEnum
CREATE TYPE "ConfirmationStatus" AS ENUM ('STARTED', 'COMPLETED', 'PAUSED', 'FLAGGED');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('PENDING', 'SYNCED', 'FAILED', 'UPDATING');

-- CreateEnum
CREATE TYPE "QCResult" AS ENUM ('PASS', 'FAIL', 'REWORK_REQUIRED');

-- CreateEnum
CREATE TYPE "OperatorShift" AS ENUM ('DAY', 'SWING', 'NIGHT', 'FLEXIBLE');

-- CreateEnum
CREATE TYPE "WorkstationCategory" AS ENUM ('MACHINING', 'ASSEMBLY', 'WELDING', 'INSPECTION', 'PACKAGING', 'PREP', 'FINISHING', 'OTHER');

-- CreateEnum
CREATE TYPE "WorkOrderItemStatus" AS ENUM ('QUEUED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'REWORK', 'SCRAPPED');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "billingAddress" TEXT,
    "shippingAddress" TEXT,
    "notes" TEXT,
    "quickbooksId" TEXT,
    "syncStatus" "SyncStatus" NOT NULL DEFAULT 'PENDING',
    "lastSyncedAt" TIMESTAMP(3),
    "syncError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" TEXT NOT NULL,
    "systemOrderId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "poNumber" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "priority" "OrderPriority" NOT NULL DEFAULT 'STANDARD',
    "notes" TEXT,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'ACTIVE',
    "completedAt" TIMESTAMP(3),
    "completedBy" TEXT,
    "completionNotes" TEXT,
    "shippedAt" TIMESTAMP(3),
    "shippedBy" TEXT,
    "shippingNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part" (
    "id" TEXT NOT NULL,
    "partNumber" TEXT NOT NULL,
    "partName" TEXT NOT NULL,
    "partType" "PartType" NOT NULL,
    "drawingNumber" TEXT,
    "revisionLevel" TEXT,
    "description" TEXT,
    "materialSpec" TEXT,
    "unitOfMeasure" TEXT,
    "standardCost" DECIMAL(65,30),
    "leadTime" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "recommendedRoutingTemplateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BOMRevision" (
    "id" TEXT NOT NULL,
    "partId" TEXT NOT NULL,
    "revisionNumber" TEXT NOT NULL,
    "description" TEXT,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "obsoleteDate" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BOMRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BOMComponent" (
    "id" TEXT NOT NULL,
    "bomRevisionId" TEXT NOT NULL,
    "childPartId" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "unitOfMeasure" TEXT,
    "scrapFactor" DECIMAL(65,30),
    "operation" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BOMComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderLineItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "partId" TEXT NOT NULL,
    "bomRevisionId" TEXT,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(65,30),
    "dueDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileAttachment" (
    "id" TEXT NOT NULL,
    "lineItemId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "storedFileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "lineItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3),
    "estimatedCompletion" TIMESTAMP(3),
    "actualCompletion" TIMESTAMP(3),
    "priority" "BatchPriority" NOT NULL DEFAULT 'STANDARD',
    "status" "BatchStatus" NOT NULL DEFAULT 'QUEUED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrderItem" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "itemNumber" INTEGER NOT NULL,
    "status" "WorkOrderItemStatus" NOT NULL DEFAULT 'QUEUED',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "currentStepId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrderStepProgress" (
    "id" TEXT NOT NULL,
    "workOrderItemId" TEXT NOT NULL,
    "routingStepId" TEXT NOT NULL,
    "status" "StepStatus" NOT NULL DEFAULT 'PENDING',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "operatorId" TEXT,
    "actualTime" INTEGER,
    "notes" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkOrderStepProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrderQualityCheck" (
    "id" TEXT NOT NULL,
    "workOrderItemId" TEXT NOT NULL,
    "routingStepId" TEXT,
    "checkType" TEXT NOT NULL,
    "result" "QCResult" NOT NULL,
    "checkedBy" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "measurements" JSONB,
    "defects" TEXT,
    "correctedBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkOrderQualityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrderMaterialUsage" (
    "id" TEXT NOT NULL,
    "workOrderItemId" TEXT NOT NULL,
    "materialPartId" TEXT NOT NULL,
    "routingStepId" TEXT,
    "quantityUsed" DECIMAL(65,30) NOT NULL,
    "unitCost" DECIMAL(65,30),
    "consumedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "operatorId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkOrderMaterialUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutingStep" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "workstationId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "estimatedTime" INTEGER,
    "notes" TEXT,
    "status" "StepStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoutingStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutingTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoutingTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutingTemplateStep" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "workstationId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedTime" INTEGER,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoutingTemplateStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workstation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "category" "WorkstationCategory" NOT NULL DEFAULT 'MACHINING',
    "location" TEXT,
    "serialNumber" TEXT,
    "manufacturer" TEXT,
    "model" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workstation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkstationCapacity" (
    "id" TEXT NOT NULL,
    "workstationId" TEXT NOT NULL,
    "maxConcurrentJobs" INTEGER NOT NULL DEFAULT 1,
    "avgSetupTime" INTEGER NOT NULL DEFAULT 30,
    "efficiency" DECIMAL(65,30) NOT NULL DEFAULT 1.0,
    "hoursPerDay" INTEGER NOT NULL DEFAULT 8,
    "maintenanceHours" INTEGER NOT NULL DEFAULT 0,
    "operatingCostPerHour" DECIMAL(65,30),
    "maintenanceCostPerHour" DECIMAL(65,30),
    "utilizationTarget" DECIMAL(65,30) NOT NULL DEFAULT 0.85,
    "qualityTarget" DECIMAL(65,30) NOT NULL DEFAULT 0.98,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkstationCapacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkstationOperator" (
    "id" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "operatorName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "certifications" TEXT[],
    "shift" "OperatorShift" NOT NULL DEFAULT 'DAY',
    "hourlyRate" DECIMAL(65,30),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "currentWorkstationId" TEXT,
    "loginTime" TIMESTAMP(3),
    "logoutTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkstationOperator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperatorSession" (
    "id" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "workstationId" TEXT NOT NULL,
    "loginTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logoutTime" TIMESTAMP(3),
    "shift" "OperatorShift" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperatorSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepConfirmation" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "workstationId" TEXT NOT NULL,
    "operatorName" TEXT NOT NULL,
    "operatorId" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "notes" TEXT,
    "photoUrl" TEXT,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "status" "ConfirmationStatus" NOT NULL DEFAULT 'STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StepConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QCRecord" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "inspector" TEXT NOT NULL,
    "inspectionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" "QCResult" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QCRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_systemOrderId_key" ON "PurchaseOrder"("systemOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Part_partNumber_key" ON "Part"("partNumber");

-- CreateIndex
CREATE UNIQUE INDEX "BOMRevision_partId_revisionNumber_key" ON "BOMRevision"("partId", "revisionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "BOMComponent_bomRevisionId_childPartId_operation_key" ON "BOMComponent"("bomRevisionId", "childPartId", "operation");

-- CreateIndex
CREATE UNIQUE INDEX "Batch_batchId_key" ON "Batch"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderItem_serialNumber_key" ON "WorkOrderItem"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderItem_batchId_itemNumber_key" ON "WorkOrderItem"("batchId", "itemNumber");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderStepProgress_workOrderItemId_routingStepId_key" ON "WorkOrderStepProgress"("workOrderItemId", "routingStepId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderMaterialUsage_workOrderItemId_materialPartId_routi_key" ON "WorkOrderMaterialUsage"("workOrderItemId", "materialPartId", "routingStepId");

-- CreateIndex
CREATE UNIQUE INDEX "RoutingStep_batchId_stepNumber_key" ON "RoutingStep"("batchId", "stepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "RoutingTemplate_name_key" ON "RoutingTemplate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RoutingTemplateStep_templateId_stepNumber_key" ON "RoutingTemplateStep"("templateId", "stepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Workstation_name_key" ON "Workstation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WorkstationCapacity_workstationId_key" ON "WorkstationCapacity"("workstationId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkstationOperator_operatorId_key" ON "WorkstationOperator"("operatorId");

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_recommendedRoutingTemplateId_fkey" FOREIGN KEY ("recommendedRoutingTemplateId") REFERENCES "RoutingTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOMRevision" ADD CONSTRAINT "BOMRevision_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOMComponent" ADD CONSTRAINT "BOMComponent_bomRevisionId_fkey" FOREIGN KEY ("bomRevisionId") REFERENCES "BOMRevision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOMComponent" ADD CONSTRAINT "BOMComponent_childPartId_fkey" FOREIGN KEY ("childPartId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLineItem" ADD CONSTRAINT "OrderLineItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLineItem" ADD CONSTRAINT "OrderLineItem_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLineItem" ADD CONSTRAINT "OrderLineItem_bomRevisionId_fkey" FOREIGN KEY ("bomRevisionId") REFERENCES "BOMRevision"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileAttachment" ADD CONSTRAINT "FileAttachment_lineItemId_fkey" FOREIGN KEY ("lineItemId") REFERENCES "OrderLineItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_lineItemId_fkey" FOREIGN KEY ("lineItemId") REFERENCES "OrderLineItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderItem" ADD CONSTRAINT "WorkOrderItem_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderStepProgress" ADD CONSTRAINT "WorkOrderStepProgress_workOrderItemId_fkey" FOREIGN KEY ("workOrderItemId") REFERENCES "WorkOrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderStepProgress" ADD CONSTRAINT "WorkOrderStepProgress_routingStepId_fkey" FOREIGN KEY ("routingStepId") REFERENCES "RoutingStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderQualityCheck" ADD CONSTRAINT "WorkOrderQualityCheck_workOrderItemId_fkey" FOREIGN KEY ("workOrderItemId") REFERENCES "WorkOrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderQualityCheck" ADD CONSTRAINT "WorkOrderQualityCheck_routingStepId_fkey" FOREIGN KEY ("routingStepId") REFERENCES "RoutingStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderMaterialUsage" ADD CONSTRAINT "WorkOrderMaterialUsage_workOrderItemId_fkey" FOREIGN KEY ("workOrderItemId") REFERENCES "WorkOrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderMaterialUsage" ADD CONSTRAINT "WorkOrderMaterialUsage_materialPartId_fkey" FOREIGN KEY ("materialPartId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderMaterialUsage" ADD CONSTRAINT "WorkOrderMaterialUsage_routingStepId_fkey" FOREIGN KEY ("routingStepId") REFERENCES "RoutingStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutingStep" ADD CONSTRAINT "RoutingStep_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutingStep" ADD CONSTRAINT "RoutingStep_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "Workstation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutingTemplateStep" ADD CONSTRAINT "RoutingTemplateStep_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "RoutingTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutingTemplateStep" ADD CONSTRAINT "RoutingTemplateStep_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "Workstation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkstationCapacity" ADD CONSTRAINT "WorkstationCapacity_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "Workstation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkstationOperator" ADD CONSTRAINT "WorkstationOperator_currentWorkstationId_fkey" FOREIGN KEY ("currentWorkstationId") REFERENCES "Workstation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperatorSession" ADD CONSTRAINT "OperatorSession_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "WorkstationOperator"("operatorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperatorSession" ADD CONSTRAINT "OperatorSession_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "Workstation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepConfirmation" ADD CONSTRAINT "StepConfirmation_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "RoutingStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepConfirmation" ADD CONSTRAINT "StepConfirmation_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "Workstation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepConfirmation" ADD CONSTRAINT "StepConfirmation_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "WorkstationOperator"("operatorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QCRecord" ADD CONSTRAINT "QCRecord_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
