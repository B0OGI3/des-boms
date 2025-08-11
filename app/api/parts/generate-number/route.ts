import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

/**
 * API endpoint for generating unique part numbers
 * Creates sequential part numbers based on part type prefixes
 */

type PartType = 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL';

const PART_TYPE_PREFIXES: Record<PartType, string> = {
  FINISHED: 'FG-',
  SEMI_FINISHED: 'SF-',
  RAW_MATERIAL: 'RM-',
};

export async function POST(request: NextRequest) {
  try {
    const { partType }: { partType: PartType } = await request.json();

    if (!partType || !PART_TYPE_PREFIXES[partType]) {
      return NextResponse.json(
        { error: 'Invalid part type provided' },
        { status: 400 }
      );
    }

    const prefix = PART_TYPE_PREFIXES[partType];

    // Find the highest existing part number for this type
    const existingParts = await prisma.part.findMany({
      where: {
        partNumber: {
          startsWith: prefix,
        },
      },
      select: {
        partNumber: true,
      },
      orderBy: {
        partNumber: 'desc',
      },
      take: 1,
    });

    let nextNumber = 1;

    if (existingParts.length > 0) {
      const lastPartNumber = existingParts[0].partNumber;
      // Extract the numeric part after the prefix
      const numericPart = lastPartNumber.replace(prefix, '');
      const lastNumber = parseInt(numericPart, 10);
      
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    // Format the new part number with leading zeros (6 digits)
    const formattedNumber = nextNumber.toString().padStart(6, '0');
    const newPartNumber = `${prefix}${formattedNumber}`;

    // Double-check uniqueness (in case of race conditions)
    const existingPart = await prisma.part.findUnique({
      where: { partNumber: newPartNumber },
      select: { id: true },
    });

    if (existingPart) {
      // If somehow the number already exists, try the next one
      const fallbackNumber = (nextNumber + 1).toString().padStart(6, '0');
      const fallbackPartNumber = `${prefix}${fallbackNumber}`;
      
      return NextResponse.json({
        partNumber: fallbackPartNumber,
        message: 'Generated fallback part number due to conflict',
      });
    }

    return NextResponse.json({
      partNumber: newPartNumber,
      message: 'Part number generated successfully',
    });

  } catch (error) {
    console.error('Error generating part number:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
