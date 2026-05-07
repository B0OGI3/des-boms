import { Injectable, NotFoundException } from '@nestjs/common';
import { PartType } from '@des-boms/shared';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Injectable()
export class PartsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(type?: string, active = true) {
    return this.prisma.part.findMany({
      where: {
        active,
        ...(type ? { partType: type as PartType } : {}),
      },
      include: { recommendedRoutingTemplate: true },
      orderBy: { partNumber: 'asc' },
    });
  }

  async findOne(id: string) {
    const part = await this.prisma.part.findUnique({
      where: { id },
      include: {
        recommendedRoutingTemplate: { include: { templateSteps: { include: { workstation: true } } } },
        bomRevisions: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!part) throw new NotFoundException(`Part ${id} not found`);
    return part;
  }

  create(dto: CreatePartDto) {
    return this.prisma.part.create({
      data: {
        partNumber: dto.partNumber,
        partName: dto.partName,
        partType: dto.partType,
        drawingNumber: dto.drawingNumber,
        revisionLevel: dto.revisionLevel,
        description: dto.description,
        materialSpec: dto.materialSpec,
        unitOfMeasure: dto.unitOfMeasure,
        recommendedRoutingTemplateId: dto.recommendedRoutingTemplateId,
        notes: dto.notes,
      },
    });
  }

  async update(id: string, dto: UpdatePartDto) {
    await this.findOne(id);
    return this.prisma.part.update({
      where: { id },
      data: {
        partName: dto.partName,
        partType: dto.partType,
        drawingNumber: dto.drawingNumber,
        revisionLevel: dto.revisionLevel,
        description: dto.description,
        materialSpec: dto.materialSpec,
        unitOfMeasure: dto.unitOfMeasure,
        recommendedRoutingTemplateId: dto.recommendedRoutingTemplateId,
        active: dto.active,
        notes: dto.notes,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.part.update({ where: { id }, data: { active: false } });
  }
}
