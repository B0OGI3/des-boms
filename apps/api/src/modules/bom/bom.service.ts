import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBomRevisionDto } from './dto/create-bom-revision.dto';
import { AddComponentDto } from './dto/add-component.dto';

@Injectable()
export class BomService {
  constructor(private readonly prisma: PrismaService) {}

  getRevisionsForPart(partId: string) {
    return this.prisma.bOMRevision.findMany({
      where: { partId },
      include: { components: { include: { childPart: true } } },
      orderBy: { effectiveDate: 'desc' },
    });
  }

  async getRevision(id: string) {
    const rev = await this.prisma.bOMRevision.findUnique({
      where: { id },
      include: {
        part: true,
        components: { include: { childPart: true } },
      },
    });
    if (!rev) throw new NotFoundException(`BOM revision ${id} not found`);
    return rev;
  }

  createRevision(dto: CreateBomRevisionDto) {
    return this.prisma.bOMRevision.create({
      data: {
        partId: dto.partId,
        revisionNumber: dto.revisionNumber,
        description: dto.description,
        effectiveDate: new Date(dto.effectiveDate),
        createdBy: dto.createdBy,
      },
    });
  }

  async addComponent(revisionId: string, dto: AddComponentDto) {
    await this.getRevision(revisionId);
    return this.prisma.bOMComponent.create({
      data: {
        bomRevisionId: revisionId,
        childPartId: dto.childPartId,
        quantity: dto.quantity,
        unitOfMeasure: dto.unitOfMeasure,
        scrapFactor: dto.scrapFactor,
        operation: dto.operation,
        notes: dto.notes,
      },
    });
  }

  async setActive(id: string, active: boolean) {
    await this.getRevision(id);
    return this.prisma.bOMRevision.update({
      where: { id },
      data: {
        active,
        obsoleteDate: active ? null : new Date(),
      },
    });
  }
}
