/**
 * DES-BOMS Database Seed Script
 * Seeds the database with sample manufacturing data for demonstration
 */

import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding DES-BOMS database with manufacturing data...');

  // Clean existing data
  await prisma.stepConfirmation.deleteMany();
  await prisma.qCRecord.deleteMany();
  await prisma.routingStep.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.fileAttachment.deleteMany();
  await prisma.orderLineItem.deleteMany();
  await prisma.purchaseOrder.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.workstation.deleteMany();

  // Create Customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'AeroDyne Systems',
        contactName: 'Sarah Johnson',
        email: 'sarah.johnson@aerodyne.com',
        phone: '(555) 123-4567',
        billingAddress: '123 Industrial Blvd, Manufacturing City, MC 12345',
        shippingAddress: '123 Industrial Blvd, Manufacturing City, MC 12345',
        notes: 'Aerospace components manufacturer - high precision requirements',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'TechFlow Industries',
        contactName: 'Michael Chen',
        email: 'michael.chen@techflow.com',
        phone: '(555) 234-5678',
        billingAddress: '456 Tech Drive, Innovation Park, IP 67890',
        shippingAddress: '456 Tech Drive, Innovation Park, IP 67890',
        notes: 'Electronics assembly - quick turnaround required',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Precision Parts Corp',
        contactName: 'Lisa Martinez',
        email: 'lisa.martinez@precisionparts.com',
        phone: '(555) 345-6789',
        billingAddress: '789 Precision Way, Quality Town, QT 13579',
        shippingAddress: '789 Precision Way, Quality Town, QT 13579',
        notes: 'Medical device components - FDA compliance required',
      },
    }),
  ]);

  console.log(`✅ Created ${customers.length} customers`);

  // Create Workstations
  const workstations = await Promise.all([
    prisma.workstation.create({
      data: {
        name: 'LATHE-1',
        description: 'CNC Lathe - High precision turning operations',
        active: true,
      },
    }),
    prisma.workstation.create({
      data: {
        name: 'MILL-1',
        description: 'CNC Milling Machine - 3-axis machining center',
        active: true,
      },
    }),
    prisma.workstation.create({
      data: {
        name: 'MILL-2',
        description: 'CNC Milling Machine - 5-axis machining center',
        active: true,
      },
    }),
    prisma.workstation.create({
      data: {
        name: 'DRILL-1',
        description: 'Drill Press Station - Precision drilling operations',
        active: true,
      },
    }),
    prisma.workstation.create({
      data: {
        name: 'GRIND-1',
        description: 'Surface Grinder - Finishing operations',
        active: true,
      },
    }),
    prisma.workstation.create({
      data: {
        name: 'INSPECT-1',
        description: 'CMM Inspection Station - Quality control',
        active: true,
      },
    }),
    prisma.workstation.create({
      data: {
        name: 'ASSEMBLY-1',
        description: 'Assembly Station - Final assembly operations',
        active: true,
      },
    }),
  ]);

  console.log(`✅ Created ${workstations.length} workstations`);

  // Create Purchase Orders with Line Items
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Order 1 - AeroDyne Systems (Rush Order)
  const order1 = await prisma.purchaseOrder.create({
    data: {
      systemOrderId: 'DES-2025-001',
      customerId: customers[0].id,
      poNumber: 'AERO-2025-001',
      dueDate: tomorrow,
      priority: 'RUSH',
      notes: 'Rush order for aerospace assembly - expedite processing',
      lineItems: {
        create: [
          {
            partNumber: 'AERO-SHAFT-001',
            partName: 'Titanium Drive Shaft',
            drawingNumber: 'DWG-AERO-001-A',
            revisionLevel: 'C',
            quantity: 12,
            dueDate: tomorrow,
            notes: 'Ti-6Al-4V material, surface finish Ra 0.8',
          },
          {
            partNumber: 'AERO-HOUSING-002',
            partName: 'Aluminum Housing Assembly',
            drawingNumber: 'DWG-AERO-002-B',
            revisionLevel: 'B',
            quantity: 6,
            dueDate: tomorrow,
            notes: '6061-T6 aluminum, anodized finish required',
          },
        ],
      },
    },
    include: { lineItems: true },
  });

  // Order 2 - TechFlow Industries (Standard)
  const order2 = await prisma.purchaseOrder.create({
    data: {
      systemOrderId: 'DES-2025-002',
      customerId: customers[1].id,
      poNumber: 'TECH-2025-047',
      dueDate: nextWeek,
      priority: 'STANDARD',
      notes: 'Standard electronics components for Q1 production',
      lineItems: {
        create: [
          {
            partNumber: 'TECH-BRACKET-001',
            partName: 'Steel Mounting Bracket',
            drawingNumber: 'DWG-TECH-001',
            revisionLevel: 'A',
            quantity: 50,
            notes: 'Cold rolled steel, powder coated black',
          },
          {
            partNumber: 'TECH-PLATE-002',
            partName: 'Aluminum Base Plate',
            drawingNumber: 'DWG-TECH-002',
            revisionLevel: 'A',
            quantity: 25,
            notes: '5052 aluminum, clear anodized',
          },
        ],
      },
    },
    include: { lineItems: true },
  });

  // Order 3 - Precision Parts Corp (Standard)
  const order3 = await prisma.purchaseOrder.create({
    data: {
      systemOrderId: 'DES-2025-003',
      customerId: customers[2].id,
      poNumber: 'PREC-2025-012',
      dueDate: nextWeek,
      priority: 'STANDARD',
      notes: 'Medical device components - FDA documentation required',
      lineItems: {
        create: [
          {
            partNumber: 'MED-PIN-001',
            partName: 'Surgical Steel Pin',
            drawingNumber: 'DWG-MED-001',
            revisionLevel: 'D',
            quantity: 100,
            notes: '316L stainless steel, biocompatible finish',
          },
        ],
      },
    },
    include: { lineItems: true },
  });

  console.log(`✅ Created 3 purchase orders with line items`);

  // Create Batches with Routing Steps
  const batches = [];

  // Batch 1 - Titanium Drive Shaft (Rush)
  const batch1 = await prisma.batch.create({
    data: {
      batchId: 'DES-2025-0717-001',
      lineItemId: order1.lineItems[0].id,
      quantity: 12,
      startDate: now,
      estimatedCompletion: tomorrow,
      priority: 'RUSH',
      status: 'IN_PROGRESS',
      notes: 'Rush batch - expedite all operations',
      routingSteps: {
        create: [
          {
            stepNumber: 1,
            workstationId: workstations.find(w => w.name === 'LATHE-1')!.id,
            description: 'Rough turning operations',
            required: true,
            estimatedTime: 45,
            notes: 'Turn to 0.005" over finish size',
            status: 'COMPLETED',
          },
          {
            stepNumber: 2,
            workstationId: workstations.find(w => w.name === 'MILL-1')!.id,
            description: 'Keyway milling',
            required: true,
            estimatedTime: 30,
            notes: 'Mill 1/4" keyway per drawing',
            status: 'IN_PROGRESS',
          },
          {
            stepNumber: 3,
            workstationId: workstations.find(w => w.name === 'GRIND-1')!.id,
            description: 'Finish grinding',
            required: true,
            estimatedTime: 60,
            notes: 'Grind to final dimensions, Ra 0.8 finish',
            status: 'PENDING',
          },
          {
            stepNumber: 4,
            workstationId: workstations.find(w => w.name === 'INSPECT-1')!.id,
            description: 'Final inspection',
            required: true,
            estimatedTime: 20,
            notes: 'CMM inspection per drawing requirements',
            status: 'PENDING',
          },
        ],
      },
    },
    include: { routingSteps: true },
  });

  // Batch 2 - Aluminum Housing (Rush)
  const batch2 = await prisma.batch.create({
    data: {
      batchId: 'DES-2025-0717-002',
      lineItemId: order1.lineItems[1].id,
      quantity: 6,
      startDate: now,
      estimatedCompletion: tomorrow,
      priority: 'RUSH',
      status: 'QUEUED',
      notes: 'Rush batch - start immediately after batch 001',
      routingSteps: {
        create: [
          {
            stepNumber: 1,
            workstationId: workstations.find(w => w.name === 'MILL-2')!.id,
            description: 'Rough milling operations',
            required: true,
            estimatedTime: 90,
            notes: '5-axis roughing operations',
            status: 'PENDING',
          },
          {
            stepNumber: 2,
            workstationId: workstations.find(w => w.name === 'MILL-2')!.id,
            description: 'Finish milling',
            required: true,
            estimatedTime: 120,
            notes: 'Finish to final dimensions',
            status: 'PENDING',
          },
          {
            stepNumber: 3,
            workstationId: workstations.find(w => w.name === 'DRILL-1')!.id,
            description: 'Drill mounting holes',
            required: true,
            estimatedTime: 30,
            notes: 'Drill and tap mounting holes',
            status: 'PENDING',
          },
          {
            stepNumber: 4,
            workstationId: workstations.find(w => w.name === 'INSPECT-1')!.id,
            description: 'Pre-anodize inspection',
            required: true,
            estimatedTime: 15,
            notes: 'Inspect before anodizing',
            status: 'PENDING',
          },
        ],
      },
    },
    include: { routingSteps: true },
  });

  // Batch 3 - Steel Brackets (Standard)
  const batch3 = await prisma.batch.create({
    data: {
      batchId: 'DES-2025-0717-003',
      lineItemId: order2.lineItems[0].id,
      quantity: 50,
      startDate: now,
      estimatedCompletion: nextWeek,
      priority: 'STANDARD',
      status: 'QUEUED',
      routingSteps: {
        create: [
          {
            stepNumber: 1,
            workstationId: workstations.find(w => w.name === 'MILL-1')!.id,
            description: 'Cut to size and rough mill',
            required: true,
            estimatedTime: 180,
            notes: 'Cut blanks and rough mill to size',
            status: 'PENDING',
          },
          {
            stepNumber: 2,
            workstationId: workstations.find(w => w.name === 'DRILL-1')!.id,
            description: 'Drill mounting holes',
            required: true,
            estimatedTime: 120,
            notes: 'Drill all mounting holes per drawing',
            status: 'PENDING',
          },
          {
            stepNumber: 3,
            workstationId: workstations.find(w => w.name === 'INSPECT-1')!.id,
            description: 'Quality inspection',
            required: true,
            estimatedTime: 30,
            notes: 'Sample inspection - 10% of parts',
            status: 'PENDING',
          },
        ],
      },
    },
    include: { routingSteps: true },
  });

  batches.push(batch1, batch2, batch3);
  console.log(`✅ Created ${batches.length} batches with routing steps`);

  // Create Step Confirmations for completed/in-progress steps
  const confirmations = await Promise.all([
    // Batch 1, Step 1 - Completed
    prisma.stepConfirmation.create({
      data: {
        stepId: batch1.routingSteps[0].id,
        workstationId: workstations.find(w => w.name === 'LATHE-1')!.id,
        operatorName: 'John Smith',
        operatorId: 'JS001',
        startTime: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        endTime: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes ago
        notes: 'Completed rough turning operations successfully',
        status: 'COMPLETED',
      },
    }),
    // Batch 1, Step 2 - In Progress
    prisma.stepConfirmation.create({
      data: {
        stepId: batch1.routingSteps[1].id,
        workstationId: workstations.find(w => w.name === 'MILL-1')!.id,
        operatorName: 'Maria Garcia',
        operatorId: 'MG002',
        startTime: new Date(now.getTime() - 15 * 60 * 1000), // 15 minutes ago
        notes: 'Started keyway milling operation',
        status: 'STARTED',
      },
    }),
  ]);

  console.log(`✅ Created ${confirmations.length} step confirmations`);

  // Create some QC Records
  const qcRecords = await Promise.all([
    // Sample QC record for a completed batch (we'll create one for demo)
    prisma.qCRecord.create({
      data: {
        batchId: batch1.id,
        inspector: 'David Wilson',
        result: 'PASS',
        notes: 'All dimensions within tolerance. Surface finish excellent.',
        inspectionDate: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
    }),
  ]);

  console.log(`✅ Created ${qcRecords.length} QC records`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - ${customers.length} customers`);
  console.log(`   - ${workstations.length} workstations`);
  console.log(`   - 3 purchase orders`);
  console.log(`   - ${batches.length} batches`);
  console.log(`   - ${confirmations.length} step confirmations`);
  console.log(`   - ${qcRecords.length} QC records`);
  console.log('\n🚀 Ready for manufacturing operations!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
