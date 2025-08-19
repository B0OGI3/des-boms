/**
 * Hierarchy Structure Verification Script
 * Validates that the project follows the established hierarchy patterns
 */

import { readdir, stat } from 'fs/promises';

interface HierarchyReport {
  barrelExports: {
    present: string[];
    missing: string[];
  };
  importPatterns: {
    goodPatterns: number;
    badPatterns: number;
    issues: string[];
  };
  domainSeparation: {
    wellOrganized: string[];
    needsWork: string[];
  };
}

async function checkBarrelExports(): Promise<{ present: string[], missing: string[] }> {
  const expectedBarrels = [
    'app/components/index.ts',
    'app/components/ui/index.ts',
    'lib/index.ts',
    'types/index.ts',
    'hooks/index.ts',
    'utils/index.ts',
    'app/batches/index.ts',
    'app/orders/index.ts'
  ];

  const present: string[] = [];
  const missing: string[] = [];

  for (const barrel of expectedBarrels) {
    try {
      await stat(barrel);
      present.push(barrel);
    } catch {
      missing.push(barrel);
    }
  }

  return { present, missing };
}

async function checkImportPatterns(): Promise<{ goodPatterns: number, badPatterns: number, issues: string[] }> {
  let goodPatterns = 0;
  let badPatterns = 0;
  const issues: string[] = [];

  // This would scan TypeScript files for import patterns
  // For now, we'll return placeholder data
  return { goodPatterns: 0, badPatterns: 0, issues: [] };
}

async function checkDomainSeparation(): Promise<{ wellOrganized: string[], needsWork: string[] }> {
  const domains = ['batches', 'orders', 'workstations', 'qc'];
  const wellOrganized: string[] = [];
  const needsWork: string[] = [];

  for (const domain of domains) {
    try {
      const domainPath = `app/${domain}`;
      const contents = await readdir(domainPath);
      
      // Check if domain has proper structure
      const hasComponents = contents.includes('components');
      const hasIndex = contents.includes('index.ts');
      
      if (hasComponents && hasIndex) {
        wellOrganized.push(domain);
      } else {
        needsWork.push(domain);
      }
    } catch {
      needsWork.push(domain);
    }
  }

  return { wellOrganized, needsWork };
}

async function generateHierarchyReport(): Promise<HierarchyReport> {
  const barrelExports = await checkBarrelExports();
  const importPatterns = await checkImportPatterns();
  const domainSeparation = await checkDomainSeparation();

  return {
    barrelExports,
    importPatterns,
    domainSeparation
  };
}

// Export for use in other scripts
export { generateHierarchyReport, type HierarchyReport };

// CLI execution
if (require.main === module) {
  generateHierarchyReport().then(report => {
    console.log('🏗️  DES-BOMS Hierarchy Structure Report');
    console.log('=====================================\n');
    
    console.log('📦 Barrel Exports:');
    console.log(`✅ Present: ${report.barrelExports.present.length}`);
    report.barrelExports.present.forEach(barrel => console.log(`   - ${barrel}`));
    
    if (report.barrelExports.missing.length > 0) {
      console.log(`❌ Missing: ${report.barrelExports.missing.length}`);
      report.barrelExports.missing.forEach(barrel => console.log(`   - ${barrel}`));
    }
    
    console.log('\n🏛️  Domain Separation:');
    console.log(`✅ Well Organized: ${report.domainSeparation.wellOrganized.join(', ')}`);
    if (report.domainSeparation.needsWork.length > 0) {
      console.log(`⚠️  Needs Work: ${report.domainSeparation.needsWork.join(', ')}`);
    }
    
    console.log('\n📊 Overall Score:');
    const totalBarrels = report.barrelExports.present.length + report.barrelExports.missing.length;
    const barrelScore = (report.barrelExports.present.length / totalBarrels) * 100;
    const domainScore = (report.domainSeparation.wellOrganized.length / 
                        (report.domainSeparation.wellOrganized.length + report.domainSeparation.needsWork.length)) * 100;
    
    console.log(`Barrel Exports: ${barrelScore.toFixed(1)}%`);
    console.log(`Domain Organization: ${domainScore.toFixed(1)}%`);
    console.log(`Overall Hierarchy Health: ${((barrelScore + domainScore) / 2).toFixed(1)}%`);
  }).catch(console.error);
}
