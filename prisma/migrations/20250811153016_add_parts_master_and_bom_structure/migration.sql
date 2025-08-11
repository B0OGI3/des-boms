/*
  Warnings:

  - You are about to drop the column `drawingNumber` on the `OrderLineItem` table. All the data in the column will be lost.
  - You are about to drop the column `partName` on the `OrderLineItem` table. All the data in the column will be lost.
  - You are about to drop the column `partNumber` on the `OrderLineItem` table. All the data in the column will be lost.
  - You are about to drop the column `revisionLevel` on the `OrderLineItem` table. All the data in the column will be lost.
  - Added the required column `partId` to the `OrderLineItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PartType" AS ENUM ('FINISHED', 'SEMI_FINISHED', 'RAW_MATERIAL');

-- AlterTable
ALTER TABLE "OrderLineItem" DROP COLUMN "drawingNumber",
DROP COLUMN "partName",
DROP COLUMN "partNumber",
DROP COLUMN "revisionLevel",
ADD COLUMN     "partId" TEXT NOT NULL,
ADD COLUMN     "unitPrice" DECIMAL(65,30);

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BOMComponent" (
    "id" TEXT NOT NULL,
    "parentPartId" TEXT NOT NULL,
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
CREATE TABLE "MaterialConsumption" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "materialPartId" TEXT NOT NULL,
    "quantityUsed" DECIMAL(65,30) NOT NULL,
    "unitCost" DECIMAL(65,30),
    "consumedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "operatorId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaterialConsumption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Part_partNumber_key" ON "Part"("partNumber");

-- CreateIndex
CREATE UNIQUE INDEX "BOMComponent_parentPartId_childPartId_key" ON "BOMComponent"("parentPartId", "childPartId");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialConsumption_batchId_materialPartId_key" ON "MaterialConsumption"("batchId", "materialPartId");

-- AddForeignKey
ALTER TABLE "BOMComponent" ADD CONSTRAINT "BOMComponent_parentPartId_fkey" FOREIGN KEY ("parentPartId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOMComponent" ADD CONSTRAINT "BOMComponent_childPartId_fkey" FOREIGN KEY ("childPartId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLineItem" ADD CONSTRAINT "OrderLineItem_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialConsumption" ADD CONSTRAINT "MaterialConsumption_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialConsumption" ADD CONSTRAINT "MaterialConsumption_materialPartId_fkey" FOREIGN KEY ("materialPartId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
