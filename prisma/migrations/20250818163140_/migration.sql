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

-- CreateIndex
CREATE UNIQUE INDEX "RoutingTemplate_name_key" ON "RoutingTemplate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RoutingTemplateStep_templateId_stepNumber_key" ON "RoutingTemplateStep"("templateId", "stepNumber");

-- AddForeignKey
ALTER TABLE "RoutingTemplateStep" ADD CONSTRAINT "RoutingTemplateStep_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "RoutingTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutingTemplateStep" ADD CONSTRAINT "RoutingTemplateStep_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "Workstation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
