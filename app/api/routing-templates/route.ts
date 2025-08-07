/**
 * Routing Templates API - For batch creation workflow
 * GET /api/routing-templates
 */

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock routing templates since they don't exist in schema yet
    // In a real implementation, these would be stored in database
    const mockTemplates = [
      {
        id: 'template-1',
        name: 'Standard Machining',
        description: 'Standard mill, turn, grind, inspect workflow',
        steps: [
          {
            stepNumber: 1,
            workstationId: 'ws-mill-1',
            workstationName: 'MILL-1',
            description: 'Rough milling operations',
            estimatedTime: 90
          },
          {
            stepNumber: 2,
            workstationId: 'ws-turn-1',
            workstationName: 'TURN-1',
            description: 'Turning operations',
            estimatedTime: 60
          },
          {
            stepNumber: 3,
            workstationId: 'ws-grind-1',
            workstationName: 'GRIND-1',
            description: 'Surface grinding',
            estimatedTime: 45
          },
          {
            stepNumber: 4,
            workstationId: 'ws-inspect-1',
            workstationName: 'INSPECT-1',
            description: 'CMM inspection',
            estimatedTime: 20
          }
        ]
      },
      {
        id: 'template-2',
        name: 'Assembly Only',
        description: 'Direct to assembly workflow',
        steps: [
          {
            stepNumber: 1,
            workstationId: 'ws-assembly-1',
            workstationName: 'ASSEMBLY-1',
            description: 'Final assembly',
            estimatedTime: 30
          },
          {
            stepNumber: 2,
            workstationId: 'ws-inspect-1',
            workstationName: 'INSPECT-1',
            description: 'Final inspection',
            estimatedTime: 15
          }
        ]
      },
      {
        id: 'template-3',
        name: 'Rush Production',
        description: 'Fast-track routing for rush orders',
        steps: [
          {
            stepNumber: 1,
            workstationId: 'ws-mill-2',
            workstationName: 'MILL-2',
            description: 'Priority milling',
            estimatedTime: 60
          },
          {
            stepNumber: 2,
            workstationId: 'ws-inspect-1',
            workstationName: 'INSPECT-1',
            description: 'Quick inspection',
            estimatedTime: 10
          }
        ]
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockTemplates,
      count: mockTemplates.length
    });

  } catch (error) {
    console.error('Error fetching routing templates:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch routing templates',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
