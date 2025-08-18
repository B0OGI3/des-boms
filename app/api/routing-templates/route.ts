/**
 * Enhanced Routing Templates API - Smart routing with business logic
 * GET /api/routing-templates
 */

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Enhanced routing templates with smart routing logic
    const smartTemplates = [
      {
        id: 'template-standard',
        name: 'Standard Machining',
        description: 'Standard mill, turn, grind, inspect workflow for general parts',
        category: 'MACHINING',
        estimatedDuration: 170, // Total minutes
        applicablePartTypes: ['FINISHED', 'SEMI_FINISHED'],
        businessRules: {
          minQuantity: 1,
          maxQuantity: 50,
          priorities: ['STANDARD']
        },
        steps: [
          {
            stepNumber: 1,
            workstationId: 'ws-mill-1',
            workstationName: 'MILL-1',
            description: 'Rough milling operations',
            estimatedTime: 90,
            required: true,
            notes: 'Use appropriate speeds and feeds for material'
          },
          {
            stepNumber: 2,
            workstationId: 'ws-turn-1',
            workstationName: 'TURN-1',
            description: 'Turning operations',
            estimatedTime: 60,
            required: true,
            notes: 'Check concentricity requirements'
          },
          {
            stepNumber: 3,
            workstationId: 'ws-inspect-1',
            workstationName: 'INSPECT-1',
            description: 'Final inspection',
            estimatedTime: 20,
            required: true,
            notes: 'CMM inspection per drawing requirements'
          }
        ]
      },
      {
        id: 'template-rush',
        name: 'Rush Production',
        description: 'Expedited routing for rush orders - skips non-critical operations',
        category: 'EXPEDITED',
        estimatedDuration: 70,
        applicablePartTypes: ['FINISHED', 'SEMI_FINISHED'],
        businessRules: {
          minQuantity: 1,
          maxQuantity: 25,
          priorities: ['RUSH'],
          autoSelect: true // Automatically selected for RUSH orders
        },
        steps: [
          {
            stepNumber: 1,
            workstationId: 'ws-mill-2',
            workstationName: 'MILL-2',
            description: 'Priority milling (combined ops)',
            estimatedTime: 60,
            required: true,
            notes: 'Combine rough and finish operations'
          },
          {
            stepNumber: 2,
            workstationId: 'ws-inspect-1',
            workstationName: 'INSPECT-1',
            description: 'Quick inspection',
            estimatedTime: 10,
            required: true,
            notes: 'Focus on critical dimensions only'
          }
        ]
      },
      {
        id: 'template-high-volume',
        name: 'High Volume Production',
        description: 'Optimized routing for large batches (100+ pieces)',
        category: 'HIGH_VOLUME',
        estimatedDuration: 330,
        applicablePartTypes: ['FINISHED', 'SEMI_FINISHED'],
        businessRules: {
          minQuantity: 100,
          maxQuantity: 1000,
          priorities: ['STANDARD', 'RUSH'],
          autoSelect: true // Automatically selected for large batches
        },
        steps: [
          {
            stepNumber: 1,
            workstationId: 'ws-mill-1',
            workstationName: 'MILL-1',
            description: 'Batch setup and tooling',
            estimatedTime: 120,
            required: true,
            notes: 'Setup for long production run'
          },
          {
            stepNumber: 2,
            workstationId: 'ws-mill-1',
            workstationName: 'MILL-1',
            description: 'High volume milling run',
            estimatedTime: 180,
            required: true,
            notes: 'Continuous production mode'
          },
          {
            stepNumber: 3,
            workstationId: 'ws-inspect-2',
            workstationName: 'INSPECT-2',
            description: 'Statistical sampling inspection',
            estimatedTime: 30,
            required: true,
            notes: 'Sample every 10th piece'
          }
        ]
      },
      {
        id: 'template-assembly',
        name: 'Assembly Only',
        description: 'Direct to assembly for purchased or pre-machined parts',
        category: 'ASSEMBLY',
        estimatedDuration: 60,
        applicablePartTypes: ['FINISHED'],
        businessRules: {
          minQuantity: 1,
          maxQuantity: 500,
          priorities: ['STANDARD', 'RUSH'],
          partNameContains: ['assembly', 'assy', 'kit'],
          autoSelect: true // Auto-selected for assembly parts
        },
        steps: [
          {
            stepNumber: 1,
            workstationId: 'ws-assembly-1',
            workstationName: 'ASSEMBLY-1',
            description: 'Component assembly',
            estimatedTime: 45,
            required: true,
            notes: 'Follow assembly drawings and torque specs'
          },
          {
            stepNumber: 2,
            workstationId: 'ws-inspect-1',
            workstationName: 'INSPECT-1',
            description: 'Assembly inspection',
            estimatedTime: 15,
            required: true,
            notes: 'Verify all components and functions'
          }
        ]
      }
    ];

    return NextResponse.json({
      success: true,
      data: smartTemplates,
      count: smartTemplates.length,
      categories: ['MACHINING', 'EXPEDITED', 'HIGH_VOLUME', 'ASSEMBLY'],
      meta: {
        version: '2.0',
        smartRoutingEnabled: true,
        autoSelectionRules: smartTemplates.filter(t => t.businessRules?.autoSelect).length
      }
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
