/**
 * Enhanced Routing Templates with Part Integration
 * This allows parts to have default routing templates while maintaining batch flexibility
 */

-- Migration: Add default routing template to parts
ALTER TABLE "Part" ADD COLUMN "defaultRoutingTemplateId" TEXT;
ALTER TABLE "Part" ADD CONSTRAINT "Part_defaultRoutingTemplateId_fkey" 
  FOREIGN KEY ("defaultRoutingTemplateId") REFERENCES "RoutingTemplate"("id");

-- Create part-specific routing templates
INSERT INTO "RoutingTemplate" (id, name, description) VALUES
('template-shaft-machining', 'Main Shaft Standard Routing', 'Standard machining for shaft parts'),
('template-housing-machining', 'Housing Standard Routing', 'Standard machining for housing parts'),
('template-assembly-only', 'Assembly Only Routing', 'Direct to assembly for purchased parts');

-- Example: Assign default templates to parts
UPDATE "Part" SET "defaultRoutingTemplateId" = 'template-shaft-machining' 
WHERE "partType" = 'FINISHED' AND "partName" LIKE '%Shaft%';

UPDATE "Part" SET "defaultRoutingTemplateId" = 'template-housing-machining' 
WHERE "partType" = 'FINISHED' AND "partName" LIKE '%Housing%';

-- Template steps for shaft machining
INSERT INTO "RoutingTemplateStep" (id, "templateId", "stepNumber", "workstationId", description, "estimatedTime") VALUES
('step-shaft-1', 'template-shaft-machining', 1, 'ws-turn-1', 'Rough turning operations', 120),
('step-shaft-2', 'template-shaft-machining', 2, 'ws-mill-1', 'Keyway milling', 30),
('step-shaft-3', 'template-shaft-machining', 3, 'ws-grind-1', 'Finish grinding', 60),
('step-shaft-4', 'template-shaft-machining', 4, 'ws-inspect-1', 'CMM inspection', 25);

-- Template steps for housing machining
INSERT INTO "RoutingTemplateStep" (id, "templateId", "stepNumber", "workstationId", description, "estimatedTime") VALUES
('step-housing-1', 'template-housing-machining', 1, 'ws-mill-1', 'Rough milling', 90),
('step-housing-2', 'template-housing-machining', 2, 'ws-mill-2', 'Finish milling', 75),
('step-housing-3', 'template-housing-machining', 3, 'ws-drill-1', 'Drilling operations', 45),
('step-housing-4', 'template-housing-machining', 4, 'ws-inspect-1', 'Final inspection', 20);
