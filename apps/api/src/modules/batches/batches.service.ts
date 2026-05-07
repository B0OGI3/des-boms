import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';

@Injectable()
export class BatchesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(lineItemId?: string) {
    return this.prisma.batch.findMany({
      where: lineItemId ? { lineItemId } : undefined,
      include: {
        lineItem: { include: { part: true, purchaseOrder: { include: { customer: true } } } },
        routingSteps: { include: { workstation: true }, orderBy: { stepNumber: 'asc' } },
        workOrderItems: true,
        qcRecords: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const batch = await this.prisma.batch.findUnique({
      where: { id },
      include: {
        lineItem: { include: { part: true, purchaseOrder: { include: { customer: true } } } },
        routingSteps: {
          include: { workstation: true, confirmations: true },
          orderBy: { stepNumber: 'asc' },
        },
        workOrderItems: {
          include: { stepProgress: true, qualityChecks: true, materialUsage: true },
        },
        qcRecords: true,
      },
    });
    if (!batch) throw new NotFoundException(`Batch ${id} not found`);
    return batch;
  }

  async create(dto: CreateBatchDto) {
    const batchId = `BATCH-${Date.now()}`;
    return this.prisma.batch.create({
      data: {
        batchId,
        lineItemId: dto.lineItemId,
        quantity: dto.quantity,
        priority: dto.priority,
        notes: dto.notes,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        estimatedCompletion: dto.estimatedCompletion ? new Date(dto.estimatedCompletion) : undefined,
      },
    });
  }

  async update(id: string, dto: UpdateBatchDto) {
    await this.findOne(id);
    return this.prisma.batch.update({
      where: { id },
      data: {
        status: dto.status,
        priority: dto.priority,
        notes: dto.notes,
        estimatedCompletion: dto.estimatedCompletion ? new Date(dto.estimatedCompletion) : undefined,
        actualCompletion: dto.actualCompletion ? new Date(dto.actualCompletion) : undefined,
      },
    });
  }
}
