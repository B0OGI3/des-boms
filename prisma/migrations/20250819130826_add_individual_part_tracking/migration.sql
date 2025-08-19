/*
  Warnings:

  - You are about to drop the `PartNumberSequence` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WorkOrderItemStatus" AS ENUM ('QUEUED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'REWORK', 'SCRAPPED');

-- DropTable
DROP TABLE "PartNumberSequence";

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
    "measurements" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderItem_serialNumber_key" ON "WorkOrderItem"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderItem_batchId_itemNumber_key" ON "WorkOrderItem"("batchId", "itemNumber");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderStepProgress_workOrderItemId_routingStepId_key" ON "WorkOrderStepProgress"("workOrderItemId", "routingStepId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderMaterialUsage_workOrderItemId_materialPartId_routi_key" ON "WorkOrderMaterialUsage"("workOrderItemId", "materialPartId", "routingStepId");

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
