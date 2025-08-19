/**
 * Repository Organization Verification Script
 * Validates that files are properly organized in their designated directories
 */

import { readdir, stat } from 'fs/promises';

interface OrganizationReport {
  docs: string[];
  tools: string[];
  deployment: string[];
  config: string[];
  misorganized: string[];
  rootCleanness: number;
}

async function checkDirectoryExists(dirPath: string): Promise<boolean> {
  try {
    const stats = await stat(dirPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function listDirectory(dirPath: string): Promise<string[]> {
  try {
    return await readdir(dirPath);
  } catch {
    return [];
  }
}

async function generateOrganizationReport(): Promise<OrganizationReport> {
  const docs = await listDirectory('docs');
  const tools = await listDirectory('tools');
  const deployment = await listDirectory('deployment');
  const config = await listDirectory('config');
  
  // Check root directory for cleanliness
  const rootFiles = await listDirectory('.');
  const expectedRootFiles = [
    'README.md',
    'package.json',
    'pnpm-lock.yaml',
    'next.config.ts',
    'tsconfig.json',
    'docker-compose.yml',
    'docker-compose.prod.yml',
    'Dockerfile',
    '.dockerignore',
    '.gitignore',
    '.env.example',
    'LICENSE',
    'next-env.d.ts',
    'tsconfig.tsbuildinfo'
  ];
  
  const expectedRootDirs = [
    'app',
    'lib',
    'types',
    'hooks',
    'utils',
    'prisma',
    'scripts',
    'docs',
    'tools',
    'deployment',
    'config',
    'public',
    'uploads',
    'generated',
    'node_modules',
    '.next',
    '.git',
    '.github'
  ];
  
  // Check for documentation files that should be in docs/
  const docFiles = rootFiles.filter(file => 
    file.endsWith('.md') && 
    file !== 'README.md' && 
    file !== 'LICENSE'
  );
  
  // Check for script files that should be in tools/ or deployment/
  const scriptFiles = rootFiles.filter(file => 
    (file.endsWith('.js') || file.endsWith('.sh') || file.endsWith('.bat')) && 
    !file.startsWith('.')
  );
  
  // Check for config files that should be in config/
  const configFiles = rootFiles.filter(file => 
    (file.includes('.config.') || file.includes('eslint') || file.includes('tailwind') || file.includes('postcss')) &&
    !expectedRootFiles.includes(file)
  );
  
  const misorganized = [
    ...docFiles.map(f => `${f} (should be in docs/)`),
    ...scriptFiles.map(f => `${f} (should be in tools/ or deployment/)`),
    ...configFiles.map(f => `${f} (should be in config/)`),
    ...rootFiles.filter(file => 
      !expectedRootFiles.includes(file) && 
      !expectedRootDirs.includes(file) &&
      !file.startsWith('.env') &&
      !docFiles.includes(file) &&
      !scriptFiles.includes(file) &&
      !configFiles.includes(file)
    ).map(f => `${f} (unexpected file in root)`)
  ];
  
  const expectedItems = expectedRootFiles.length + expectedRootDirs.length;
  const rootCleanness = Math.max(0, (expectedItems - misorganized.length) / expectedItems * 100);
  
  return {
    docs,
    tools,
    deployment,
    config,
    misorganized,
    rootCleanness
  };
}

// Export for use in other scripts
export { generateOrganizationReport, type OrganizationReport };

// CLI execution
if (require.main === module) {
  generateOrganizationReport().then(report => {
    console.log('📁 DES-BOMS Repository Organization Report');
    console.log('=========================================\n');
    
    console.log('📚 Documentation (`docs/`):');
    console.log(`   Files: ${report.docs.length}`);
    report.docs.forEach(file => console.log(`   - ${file}`));
    
    console.log('\n🛠️  Development Tools (`tools/`):');
    console.log(`   Files: ${report.tools.length}`);
    report.tools.forEach(file => console.log(`   - ${file}`));
    
    console.log('\n🚀 Deployment Scripts (`deployment/`):');
    console.log(`   Files: ${report.deployment.length}`);
    report.deployment.forEach(file => console.log(`   - ${file}`));
    
    console.log('\n⚙️  Configuration Files (`config/`):');
    console.log(`   Files: ${report.config.length}`);
    report.config.forEach(file => console.log(`   - ${file}`));
    
    if (report.misorganized.length > 0) {
      console.log('\n⚠️  Misorganized Files (in root):');
      report.misorganized.forEach(file => console.log(`   - ${file}`));
    }
    
    console.log('\n📊 Organization Score:');
    console.log(`Root Directory Cleanliness: ${report.rootCleanness.toFixed(1)}%`);
    
    if (report.rootCleanness >= 90) {
      console.log('✅ Repository is well organized!');
    } else if (report.rootCleanness >= 70) {
      console.log('⚠️  Repository organization could be improved');
    } else {
      console.log('❌ Repository needs better organization');
    }
  }).catch(console.error);
}
