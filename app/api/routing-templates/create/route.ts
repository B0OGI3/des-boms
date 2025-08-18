import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/routing-templates/create - Create a new routing template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, steps } = body;

    if (!name || !steps || !Array.isArray(steps)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name and steps array',
        },
        { status: 400 }
      );
    }

    // Create the template with its steps in a transaction
    const template = await prisma.$transaction(async (tx) => {
      // Create the template
      const newTemplate = await tx.routingTemplate.create({
        data: {
          name,
          description,
        },
      });

      // Create the template steps
      const templateSteps = await Promise.all(
        steps.map((step: any, index: number) =>
          tx.routingTemplateStep.create({
            data: {
              templateId: newTemplate.id,
              stepNumber: index + 1,
              workstationId: step.workstationId,
              description: step.description,
              estimatedTime: step.estimatedTime,
              required: step.required ?? true,
              notes: step.notes,
            },
          })
        )
      );

      return {
        ...newTemplate,
        templateSteps,
      };
    });

    return NextResponse.json({
      success: true,
      data: template,
    });
  } catch (error) {
    console.error('Error creating routing template:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create routing template',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
