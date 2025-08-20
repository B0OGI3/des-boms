import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);
const BACKUP_DIR = process.env.BACKUP_DIR || '/opt/des-boms/backups';

export async function POST() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = `des_boms_${timestamp}.sql`;
    const backupPath = path.join(BACKUP_DIR, backupFile);
    
    // Ensure backup directory exists
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    
    // Create database backup
    await execAsync(`pg_dump ${process.env.DATABASE_URL} > ${backupPath}`);
    
    // Compress the backup
    await execAsync(`gzip ${backupPath}`);
    
    // Get backup file size
    const stats = await fs.stat(`${backupPath}.gz`);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    return Response.json({
      success: true,
      backup: `${backupFile}.gz`,
      size: `${fileSizeInMB} MB`,
      timestamp: new Date().toISOString(),
      path: `${backupPath}.gz`
    });
    
  } catch (error) {
    console.error('Backup failed:', error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // List recent backups
    const files = await fs.readdir(BACKUP_DIR);
    const backupFiles = files
      .filter(file => file.startsWith('des_boms_') && file.endsWith('.sql.gz'))
      .sort((a, b) => b.localeCompare(a))
      .slice(0, 10); // Last 10 backups
    
    const backups = await Promise.all(
      backupFiles.map(async (file) => {
        const filePath = path.join(BACKUP_DIR, file);
        const stats = await fs.stat(filePath);
        return {
          filename: file,
          size: `${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
          created: stats.mtime.toISOString(),
          path: filePath
        };
      })
    );
    
    return Response.json({
      success: true,
      backups
    });
    
  } catch (error) {
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
