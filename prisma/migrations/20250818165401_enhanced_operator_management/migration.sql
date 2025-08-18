-- CreateEnum
CREATE TYPE "OperatorShift" AS ENUM ('DAY', 'SWING', 'NIGHT', 'FLEXIBLE');

-- CreateEnum
CREATE TYPE "WorkstationCategory" AS ENUM ('MACHINING', 'ASSEMBLY', 'WELDING', 'INSPECTION', 'PACKAGING', 'PREP', 'FINISHING', 'OTHER');

-- AlterTable
ALTER TABLE "Workstation" ADD COLUMN     "category" "WorkstationCategory" NOT NULL DEFAULT 'MACHINING',
ADD COLUMN     "location" TEXT,
ADD COLUMN     "manufacturer" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "serialNumber" TEXT;

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

-- CreateIndex
CREATE UNIQUE INDEX "WorkstationOperator_operatorId_key" ON "WorkstationOperator"("operatorId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkstationCapacity_workstationId_key" ON "WorkstationCapacity"("workstationId");

-- AddForeignKey
ALTER TABLE "WorkstationOperator" ADD CONSTRAINT "WorkstationOperator_currentWorkstationId_fkey" FOREIGN KEY ("currentWorkstationId") REFERENCES "Workstation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperatorSession" ADD CONSTRAINT "OperatorSession_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "WorkstationOperator"("operatorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperatorSession" ADD CONSTRAINT "OperatorSession_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "Workstation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkstationCapacity" ADD CONSTRAINT "WorkstationCapacity_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "Workstation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepConfirmation" ADD CONSTRAINT "StepConfirmation_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "WorkstationOperator"("operatorId") ON DELETE SET NULL ON UPDATE CASCADE;
