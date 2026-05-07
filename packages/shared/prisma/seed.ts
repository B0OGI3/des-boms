import { PrismaClient, PartType, WorkstationCategory, BatchPriority, OrderPriority } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Workstations
  const workstations = await Promise.all([
    prisma.workstation.upsert({
      where: { name: 'CNC-01' },
      update: {},
      create: { name: 'CNC-01', description: 'CNC Milling Machine', category: WorkstationCategory.MACHINING, location: 'Bay A' },
    }),
    prisma.workstation.upsert({
      where: { name: 'WELD-01' },
      update: {},
      create: { name: 'WELD-01', description: 'MIG Welding Station', category: WorkstationCategory.WELDING, location: 'Bay B' },
    }),
    prisma.workstation.upsert({
      where: { name: 'ASSY-01' },
      update: {},
      create: { name: 'ASSY-01', description: 'Final Assembly Bench', category: WorkstationCategory.ASSEMBLY, location: 'Bay C' },
    }),
    prisma.workstation.upsert({
      where: { name: 'QC-01' },
      update: {},
      create: { name: 'QC-01', description: 'Quality Control Station', category: WorkstationCategory.INSPECTION, location: 'Bay D' },
    }),
    prisma.workstation.upsert({
      where: { name: 'FINISH-01' },
      update: {},
      create: { name: 'FINISH-01', description: 'Powder Coat & Finishing', category: WorkstationCategory.FINISHING, location: 'Bay E' },
    }),
  ]);

  const [cnc, weld, assy, qc, finish] = workstations;
  console.log(`Created ${workstations.length} workstations`);

  // Routing template
  const template = await prisma.routingTemplate.upsert({
    where: { name: 'Standard Fabrication' },
    update: {},
    create: {
      name: 'Standard Fabrication',
      description: 'Default routing for fabricated parts: machine → weld → finish → assemble → inspect',
      templateSteps: {
        create: [
          { stepNumber: 1, workstationId: cnc.id, description: 'CNC Machining', estimatedTime: 60, required: true },
          { stepNumber: 2, workstationId: weld.id, description: 'Welding', estimatedTime: 45, required: true },
          { stepNumber: 3, workstationId: finish.id, description: 'Surface Finishing', estimatedTime: 30, required: true },
          { stepNumber: 4, workstationId: assy.id, description: 'Assembly', estimatedTime: 90, required: true },
          { stepNumber: 5, workstationId: qc.id, description: 'Final Inspection', estimatedTime: 20, required: true },
        ],
      },
    },
  });
  console.log(`Created routing template: ${template.name}`);

  // Parts
  const rawSteel = await prisma.part.upsert({
    where: { partNumber: 'RM-STEEL-001' },
    update: {},
    create: {
      partNumber: 'RM-STEEL-001',
      partName: 'Steel Bar Stock 1" x 12"',
      partType: PartType.RAW_MATERIAL,
      unitOfMeasure: 'EA',
      materialSpec: 'A36 Steel',
    },
  });

  const rawAlum = await prisma.part.upsert({
    where: { partNumber: 'RM-ALUM-001' },
    update: {},
    create: {
      partNumber: 'RM-ALUM-001',
      partName: 'Aluminum Extrusion 2" x 2"',
      partType: PartType.RAW_MATERIAL,
      unitOfMeasure: 'FT',
      materialSpec: '6061-T6 Aluminum',
    },
  });

  const bracket = await prisma.part.upsert({
    where: { partNumber: 'SF-BRKT-001' },
    update: {},
    create: {
      partNumber: 'SF-BRKT-001',
      partName: 'Mounting Bracket',
      partType: PartType.SEMI_FINISHED,
      drawingNumber: 'DWG-1001',
      revisionLevel: 'B',
      recommendedRoutingTemplateId: template.id,
    },
  });

  const assembly = await prisma.part.upsert({
    where: { partNumber: 'FG-ASSY-001' },
    update: {},
    create: {
      partNumber: 'FG-ASSY-001',
      partName: 'Control Panel Assembly',
      partType: PartType.FINISHED,
      drawingNumber: 'DWG-2001',
      revisionLevel: 'A',
      recommendedRoutingTemplateId: template.id,
    },
  });
  console.log('Created 4 parts');

  // BOM revision for the finished assembly
  const bomRev = await prisma.bOMRevision.upsert({
    where: { partId_revisionNumber: { partId: assembly.id, revisionNumber: 'A' } },
    update: {},
    create: {
      partId: assembly.id,
      revisionNumber: 'A',
      description: 'Initial release',
      effectiveDate: new Date('2025-01-01'),
      createdBy: 'eng@des.com',
      components: {
        create: [
          { childPartId: bracket.id, quantity: 2, unitOfMeasure: 'EA', operation: 'Assembly' },
          { childPartId: rawAlum.id, quantity: 1.5, unitOfMeasure: 'FT', operation: 'CNC Machining' },
          { childPartId: rawSteel.id, quantity: 4, unitOfMeasure: 'EA', operation: 'Welding' },
        ],
      },
    },
  });
  console.log(`Created BOM revision ${bomRev.revisionNumber} for ${assembly.partName}`);

  // Customer
  const customer = await prisma.customer.upsert({
    where: { email: 'procurement@acme.com' },
    update: {},
    create: {
      name: 'Acme Industries',
      contactName: 'Jane Smith',
      email: 'procurement@acme.com',
      phone: '555-0100',
    },
  });
  console.log(`Created customer: ${customer.name}`);

  // Purchase order
  const order = await prisma.purchaseOrder.upsert({
    where: { systemOrderId: 'SEED-PO-001' },
    update: {},
    create: {
      systemOrderId: 'SEED-PO-001',
      customerId: customer.id,
      poNumber: 'PO-2025-001',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      priority: OrderPriority.STANDARD,
      lineItems: {
        create: {
          partId: assembly.id,
          bomRevisionId: bomRev.id,
          quantity: 10,
        },
      },
    },
    include: { lineItems: true },
  });
  console.log(`Created purchase order: ${order.poNumber}`);

  console.log('Seed complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
