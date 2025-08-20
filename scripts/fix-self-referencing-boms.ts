import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function findAndFixSelfReferencingBOMs() {
  try {
    console.log('🔍 Searching for self-referencing BOM components...');
    
    // Find BOM components where parentPartId === childPartId
    const selfReferencingBOMs = await prisma.bOMComponent.findMany({
      where: {
        parentPartId: {
          equals: prisma.bOMComponent.fields.childPartId
        }
      },
      include: {
        parentPart: {
          select: {
            partNumber: true,
            partName: true
          }
        },
        childPart: {
          select: {
            partNumber: true,
            partName: true
          }
        }
      }
    });

    console.log(`Found ${selfReferencingBOMs.length} self-referencing BOM components:`);
    
    for (const bom of selfReferencingBOMs) {
      console.log(`❌ ${bom.parentPart.partNumber} - ${bom.parentPart.partName} references itself`);
      console.log(`   BOM Component ID: ${bom.id}`);
      console.log(`   Parent Part ID: ${bom.parentPartId}`);
      console.log(`   Child Part ID: ${bom.childPartId}`);
      console.log(`   Quantity: ${bom.quantity}`);
      console.log('');
    }

    if (selfReferencingBOMs.length > 0) {
      console.log('🔧 Fixing self-referencing BOM components...');
      
      // Delete all self-referencing BOM components
      const deleteResult = await prisma.bOMComponent.deleteMany({
        where: {
          parentPartId: {
            equals: prisma.bOMComponent.fields.childPartId
          }
        }
      });

      console.log(`✅ Deleted ${deleteResult.count} self-referencing BOM components`);
    } else {
      console.log('✅ No self-referencing BOM components found');
    }

  } catch (error) {
    console.error('❌ Error finding/fixing self-referencing BOMs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Alternative method using raw SQL for better performance
async function findSelfReferencingBOMsSQL() {
  try {
    console.log('🔍 Using SQL to find self-referencing BOM components...');
    
    const selfReferencingBOMs = await prisma.$queryRaw`
      SELECT 
        bc.id,
        bc."parentPartId",
        bc."childPartId",
        bc.quantity,
        p."partNumber",
        p."partName"
      FROM "BOMComponent" bc
      JOIN "Part" p ON bc."parentPartId" = p.id
      WHERE bc."parentPartId" = bc."childPartId"
    `;

    console.log('Self-referencing BOM components found:', selfReferencingBOMs);
    
    if (Array.isArray(selfReferencingBOMs) && selfReferencingBOMs.length > 0) {
      console.log('🔧 Deleting self-referencing BOM components...');
      
      const deleteResult = await prisma.$executeRaw`
        DELETE FROM "BOMComponent" 
        WHERE "parentPartId" = "childPartId"
      `;

      console.log(`✅ Deleted ${deleteResult} self-referencing BOM components`);
    } else {
      console.log('✅ No self-referencing BOM components found');
    }

  } catch (error) {
    console.error('❌ Error with SQL method:', error);
  }
}

// Run both methods
async function main() {
  console.log('🚀 Starting self-referencing BOM cleanup...\n');
  
  await findSelfReferencingBOMsSQL();
  console.log('\n' + '='.repeat(50) + '\n');
  await findAndFixSelfReferencingBOMs();
  
  console.log('\n✅ Cleanup complete!');
}

main().catch(console.error);
