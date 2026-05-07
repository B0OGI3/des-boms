import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { ConfirmStepDto } from './dto/confirm-step.dto';

@Injectable()
export class RoutingService {
  constructor(private readonly prisma: PrismaService) {}

  findTemplates() {
    return this.prisma.routingTemplate.findMany({
      where: { active: true },
      include: { templateSteps: { include: { workstation: true }, orderBy: { stepNumber: 'asc' } } },
      orderBy: { name: 'asc' },
    });
  }

  async findTemplate(id: string) {
    const t = await this.prisma.routingTemplate.findUnique({
      where: { id },
      include: { templateSteps: { include: { workstation: true }, orderBy: { stepNumber: 'asc' } } },
    });
    if (!t) throw new NotFoundException(`Template ${id} not found`);
    return t;
  }

  createTemplate(dto: CreateTemplateDto) {
    return this.prisma.routingTemplate.create({
      data: {
        name: dto.name,
        description: dto.description,
        templateSteps: {
          create: dto.steps?.map((s) => ({
            stepNumber: s.stepNumber,
            workstationId: s.workstationId,
            description: s.description,
            estimatedTime: s.estimatedTime,
            required: s.required ?? true,
            notes: s.notes,
          })),
        },
      },
      include: { templateSteps: true },
    });
  }

  async applyTemplateToBatch(batchId: string, templateId: string) {
    const template = await this.findTemplate(templateId);
    return this.prisma.$transaction(
      template.templateSteps.map((s) =>
        this.prisma.routingStep.create({
          data: {
            batchId,
            stepNumber: s.stepNumber,
            workstationId: s.workstationId,
            description: s.description,
            estimatedTime: s.estimatedTime ?? undefined,
            required: s.required,
            notes: s.notes ?? undefined,
          },
        }),
      ),
    );
  }

  async confirmStep(stepId: string, dto: ConfirmStepDto) {
    return this.prisma.stepConfirmation.create({
      data: {
        stepId,
        workstationId: dto.workstationId,
        operatorName: dto.operatorName,
        operatorId: dto.operatorId,
        startTime: dto.startTime ? new Date(dto.startTime) : undefined,
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
        notes: dto.notes,
        photoUrl: dto.photoUrl,
        status: dto.status ?? 'COMPLETED',
      },
    });
  }
}
