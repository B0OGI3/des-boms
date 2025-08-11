/**
 * Part Number Generator for DES-BOMS
 * 
 * Generates unique part numbers with prefixes based on part type:
 * - FG-YYYY-####: Finished Goods/Assemblies
 * - SF-YYYY-####: Semi-Finished Parts/Sub-assemblies  
 * - RM-YYYY-####: Raw Materials/Stock
 */

import { PrismaClient, PartType } from '../generated/prisma';

const prisma = new PrismaClient();

export interface PartNumberConfig {
  partType: PartType;
  year?: number;
}

/**
 * Get the appropriate prefix for a part type
 */
export function getPartTypePrefix(partType: PartType): string {
  switch (partType) {
    case 'FINISHED':
      return 'FG';
    case 'SEMI_FINISHED':
      return 'SF';
    case 'RAW_MATERIAL':
      return 'RM';
    default:
      throw new Error(`Unknown part type: ${partType}`);
  }
}

/**
 * Generate the next sequential number for a given part type and year
 */
export async function getNextSequentialNumber(partType: PartType, year: number): Promise<number> {
  const prefix = getPartTypePrefix(partType);
  const yearStr = year.toString();
  
  // Find the highest existing part number for this type/year
  const existingParts = await prisma.part.findMany({
    where: {
      partNumber: {
        startsWith: `${prefix}-${yearStr}-`
      }
    },
    select: {
      partNumber: true
    },
    orderBy: {
      partNumber: 'desc'
    },
    take: 1
  });

  if (existingParts.length === 0) {
    return 1; // First part of this type for this year
  }

  // Extract the sequential number from the last part
  const lastPartNumber = existingParts[0].partNumber;
  const parts = lastPartNumber.split('-');
  if (parts.length !== 3) {
    throw new Error(`Invalid part number format: ${lastPartNumber}`);
  }

  const lastSequential = parseInt(parts[2], 10);
  if (isNaN(lastSequential)) {
    throw new Error(`Invalid sequential number in part number: ${lastPartNumber}`);
  }

  return lastSequential + 1;
}

// Simple counter for demo purposes - in production this should be database-backed
const partCounters: { [key: string]: number } = {};

/**
 * Generate the next sequential number for a given part type and year (demo version)
 */
export async function getNextSequentialNumberDemo(partType: PartType, year: number): Promise<number> {
  const key = `${getPartTypePrefix(partType)}-${year}`;
  
  if (!(key in partCounters)) {
    partCounters[key] = 0;
  }
  
  partCounters[key]++;
  return partCounters[key];
}

/**
 * Generate a new unique part number
 */
export async function generatePartNumber(config: PartNumberConfig): Promise<string> {
  const year = config.year || new Date().getFullYear();
  const prefix = getPartTypePrefix(config.partType);
  const sequential = await getNextSequentialNumberDemo(config.partType, year); // Use demo version for seeding
  
  // Format: XX-YYYY-#### (4-digit sequential)
  const partNumber = `${prefix}-${year}-${sequential.toString().padStart(4, '0')}`;
  
  return partNumber;
}

/**
 * Validate a part number format
 */
export function validatePartNumber(partNumber: string): { isValid: boolean; partType?: PartType; year?: number; sequential?: number } {
  const regex = /^(FG|SF|RM)-(\d{4})-(\d{4})$/;
  const match = regex.exec(partNumber);
  
  if (!match) {
    return { isValid: false };
  }

  const [, prefix, yearStr, sequentialStr] = match;
  const year = parseInt(yearStr, 10);
  const sequential = parseInt(sequentialStr, 10);

  let partType: PartType;
  switch (prefix) {
    case 'FG':
      partType = 'FINISHED';
      break;
    case 'SF':
      partType = 'SEMI_FINISHED';
      break;
    case 'RM':
      partType = 'RAW_MATERIAL';
      break;
    default:
      return { isValid: false };
  }

  return {
    isValid: true,
    partType,
    year,
    sequential
  };
}

/**
 * Get part type description for display
 */
export function getPartTypeDescription(partType: PartType): string {
  switch (partType) {
    case 'FINISHED':
      return 'Finished Goods/Assemblies';
    case 'SEMI_FINISHED':
      return 'Semi-Finished Parts/Sub-assemblies';
    case 'RAW_MATERIAL':
      return 'Raw Materials/Stock';
    default:
      return 'Unknown Part Type';
  }
}

/**
 * Example part numbers for documentation:
 * - FG-2025-0001: Titanium Drive Shaft Assembly
 * - SF-2025-0001: Machined Housing (before anodizing)
 * - RM-2025-0001: Ti-6Al-4V Round Bar Stock
 */
