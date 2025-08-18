/**
 * Smart Routing Selection API
 * POST /api/routing-templates/select - Get optimal routing template for batch parameters
 */

import { NextRequest, NextResponse } from 'next/server';

interface RoutingSelectionRequest {
  partId?: string;
  partType?: string;
  partName?: string;
  materialSpec?: string;
  quantity: number;
  priority: 'RUSH' | 'STANDARD' | 'HOLD';
  customerType?: string;
  specialRequirements?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: RoutingSelectionRequest = await request.json();
    const { 
      partType, 
      partName = '', 
      materialSpec = '', 
      quantity, 
      priority, 
      customerType,
      specialRequirements = []
    } = body;

    // Validate required fields
    if (!quantity || !priority) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: quantity, priority' },
        { status: 400 }
      );
    }

    // Smart routing selection logic
    const selectedTemplate = selectOptimalTemplate({
      partType,
      partName: partName.toLowerCase(),
      materialSpec: materialSpec.toLowerCase(),
      quantity,
      priority,
      customerType: customerType?.toLowerCase(),
      specialRequirements: specialRequirements.map(req => req.toLowerCase())
    });

    // Get the full template details
    const templateDetails = await getTemplateDetails(selectedTemplate.templateId);

    if (!templateDetails) {
      return NextResponse.json(
        { success: false, error: 'Selected template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        selectedTemplate: templateDetails,
        selectionReason: selectedTemplate.reason,
        confidence: selectedTemplate.confidence,
        alternatives: selectedTemplate.alternatives,
        estimatedDuration: templateDetails.estimatedDuration,
        totalSteps: templateDetails.steps.length
      },
      message: `Selected "${templateDetails.name}" template - ${selectedTemplate.reason}`
    });

  } catch (error) {
    console.error('Error selecting routing template:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to select routing template',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Smart template selection logic
 */
function selectOptimalTemplate(params: any) {
  const { partName, materialSpec, quantity, priority, customerType, specialRequirements } = params;
  
  // Rule 1: Rush orders get expedited routing
  if (priority === 'RUSH') {
    return {
      templateId: 'template-rush',
      reason: 'Rush priority requires expedited routing',
      confidence: 0.95,
      alternatives: ['template-standard']
    };
  }

  // Rule 2: High volume batches get optimized routing
  if (quantity >= 100) {
    return {
      templateId: 'template-high-volume',
      reason: `Large batch size (${quantity} pieces) benefits from high-volume routing`,
      confidence: 0.90,
      alternatives: ['template-standard']
    };
  }

  // Rule 3: Assembly parts skip machining
  if (partName.includes('assembly') || partName.includes('assy') || partName.includes('kit')) {
    return {
      templateId: 'template-assembly',
      reason: 'Part name indicates assembly operation',
      confidence: 0.85,
      alternatives: ['template-standard']
    };
  }

  // Rule 4: Precision materials or critical parts
  const precisionMaterials = ['ti-6al-4v', 'inconel', '17-4ph', 'titanium'];
  const precisionKeywords = ['precision', 'critical', 'aerospace', 'tight tolerance'];
  
  if (precisionMaterials.some(mat => materialSpec.includes(mat)) ||
      precisionKeywords.some(keyword => partName.includes(keyword)) ||
      specialRequirements.some((req: string) => precisionKeywords.some(keyword => req.includes(keyword)))) {
    return {
      templateId: 'template-precision',
      reason: 'Precision material or critical part requirements detected',
      confidence: 0.80,
      alternatives: ['template-standard']
    };
  }

  // Rule 5: Prototype or development parts
  const prototypeKeywords = ['proto', 'prototype', 'development', 'test', 'sample'];
  if (prototypeKeywords.some(keyword => partName.includes(keyword)) ||
      customerType === 'internal' || customerType === 'development' ||
      quantity <= 5) {
    return {
      templateId: 'template-prototype',
      reason: 'Prototype or development part characteristics',
      confidence: 0.75,
      alternatives: ['template-standard']
    };
  }

  // Default: Standard machining
  return {
    templateId: 'template-standard',
    reason: 'Standard routing for general manufacturing',
    confidence: 0.70,
    alternatives: ['template-rush', 'template-assembly']
  };
}

/**
 * Get template details by ID
 */
async function getTemplateDetails(templateId: string) {
  // This would typically fetch from database, but for now use the same templates as the main API
  const templates: any = {
    'template-standard': {
      id: 'template-standard',
      name: 'Standard Machining',
      description: 'Standard mill, turn, grind, inspect workflow for general parts',
      category: 'MACHINING',
      estimatedDuration: 170,
      steps: [
        { stepNumber: 1, workstationId: 'ws-mill-1', workstationName: 'MILL-1', description: 'Rough milling operations', estimatedTime: 90, required: true },
        { stepNumber: 2, workstationId: 'ws-turn-1', workstationName: 'TURN-1', description: 'Turning operations', estimatedTime: 60, required: true },
        { stepNumber: 3, workstationId: 'ws-inspect-1', workstationName: 'INSPECT-1', description: 'Final inspection', estimatedTime: 20, required: true }
      ]
    },
    'template-rush': {
      id: 'template-rush',
      name: 'Rush Production',
      description: 'Expedited routing for rush orders',
      category: 'EXPEDITED',
      estimatedDuration: 70,
      steps: [
        { stepNumber: 1, workstationId: 'ws-mill-2', workstationName: 'MILL-2', description: 'Priority milling (combined ops)', estimatedTime: 60, required: true },
        { stepNumber: 2, workstationId: 'ws-inspect-1', workstationName: 'INSPECT-1', description: 'Quick inspection', estimatedTime: 10, required: true }
      ]
    },
    'template-high-volume': {
      id: 'template-high-volume',
      name: 'High Volume Production',
      description: 'Optimized routing for large batches',
      category: 'HIGH_VOLUME',
      estimatedDuration: 330,
      steps: [
        { stepNumber: 1, workstationId: 'ws-mill-1', workstationName: 'MILL-1', description: 'Batch setup and tooling', estimatedTime: 120, required: true },
        { stepNumber: 2, workstationId: 'ws-mill-1', workstationName: 'MILL-1', description: 'High volume milling run', estimatedTime: 180, required: true },
        { stepNumber: 3, workstationId: 'ws-inspect-2', workstationName: 'INSPECT-2', description: 'Statistical sampling inspection', estimatedTime: 30, required: true }
      ]
    },
    'template-assembly': {
      id: 'template-assembly',
      name: 'Assembly Only',
      description: 'Direct to assembly workflow',
      category: 'ASSEMBLY',
      estimatedDuration: 60,
      steps: [
        { stepNumber: 1, workstationId: 'ws-assembly-1', workstationName: 'ASSEMBLY-1', description: 'Component assembly', estimatedTime: 45, required: true },
        { stepNumber: 2, workstationId: 'ws-inspect-1', workstationName: 'INSPECT-1', description: 'Assembly inspection', estimatedTime: 15, required: true }
      ]
    },
    'template-precision': {
      id: 'template-precision',
      name: 'Precision Machining',
      description: 'High-precision routing for critical parts',
      category: 'PRECISION',
      estimatedDuration: 255,
      steps: [
        { stepNumber: 1, workstationId: 'ws-mill-1', workstationName: 'MILL-1', description: 'Rough milling operations', estimatedTime: 90, required: true },
        { stepNumber: 2, workstationId: 'ws-turn-1', workstationName: 'TURN-1', description: 'Precision turning', estimatedTime: 75, required: true },
        { stepNumber: 3, workstationId: 'ws-grind-1', workstationName: 'GRIND-1', description: 'Surface grinding', estimatedTime: 45, required: true },
        { stepNumber: 4, workstationId: 'ws-inspect-1', workstationName: 'INSPECT-1', description: 'CMM inspection', estimatedTime: 25, required: true },
        { stepNumber: 5, workstationId: 'ws-qa-1', workstationName: 'QA-1', description: 'Quality documentation', estimatedTime: 20, required: true }
      ]
    },
    'template-prototype': {
      id: 'template-prototype',
      name: 'Prototype Development',
      description: 'Flexible routing for prototypes',
      category: 'PROTOTYPE',
      estimatedDuration: 200,
      steps: [
        { stepNumber: 1, workstationId: 'ws-mill-2', workstationName: 'MILL-2', description: 'Prototype machining', estimatedTime: 120, required: true },
        { stepNumber: 2, workstationId: 'ws-inspect-1', workstationName: 'INSPECT-1', description: 'Development inspection', estimatedTime: 30, required: true },
        { stepNumber: 3, workstationId: 'ws-engineering', workstationName: 'ENGINEERING', description: 'Engineering review', estimatedTime: 50, required: false }
      ]
    }
  };

  return templates[templateId] || null;
}
