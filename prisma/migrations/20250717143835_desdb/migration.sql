-- CreateEnum
CREATE TYPE "OrderPriority" AS ENUM ('RUSH', 'STANDARD', 'HOLD');

-- CreateEnum
CREATE TYPE "BatchPriority" AS ENUM ('RUSH', 'STANDARD', 'HOLD');

-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('QUEUED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED');

-- CreateEnum
CREATE TYPE "StepStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED', 'FAILED');

-- CreateEnum
CREATE TYPE "ConfirmationStatus" AS ENUM ('STARTED', 'COMPLETED', 'PAUSED', 'FLAGGED');

-- CreateEnum
CREATE TYPE "QCResult" AS ENUM ('PASS', 'FAIL', 'REWORK_REQUIRED');

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderLineItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "partNumber" TEXT NOT NULL,
    "partName" TEXT NOT NULL,
    "drawingNumber" TEXT,
    "revisionLevel" TEXT,
    "quantity" INTEGER NOT NULL,
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
    "fileType" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
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
CREATE TABLE "Workstation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workstation_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Batch_batchId_key" ON "Batch"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "RoutingStep_batchId_stepNumber_key" ON "RoutingStep"("batchId", "stepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Workstation_name_key" ON "Workstation"("name");

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLineItem" ADD CONSTRAINT "OrderLineItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileAttachment" ADD CONSTRAINT "FileAttachment_lineItemId_fkey" FOREIGN KEY ("lineItemId") REFERENCES "OrderLineItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_lineItemId_fkey" FOREIGN KEY ("lineItemId") REFERENCES "OrderLineItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutingStep" ADD CONSTRAINT "RoutingStep_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutingStep" ADD CONSTRAINT "RoutingStep_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "Workstation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepConfirmation" ADD CONSTRAINT "StepConfirmation_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "RoutingStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepConfirmation" ADD CONSTRAINT "StepConfirmation_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "Workstation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QCRecord" ADD CONSTRAINT "QCRecord_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
