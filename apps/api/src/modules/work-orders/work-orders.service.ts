import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { WorkOrderItemStatus, StepStatus } from '@des-boms/shared';
import { PrismaService } from '../../prisma/prisma.service';
import { AdvanceStepDto } from './dto/advance-step.dto';
import { RecordMaterialUsageDto } from './dto/record-material-usage.dto';
import { RecordQualityCheckDto } from './dto/record-quality-check.dto';

@Injectable()
export class WorkOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async spawnItems(batchId: string) {
    const batch = await this.prisma.batch.findUnique({
      where: { id: batchId },
      include: { workOrderItems: true, routingSteps: { orderBy: { stepNumber: 'asc' } } },
    });
    if (!batch) throw new NotFoundException(`Batch ${batchId} not found`);
    if (batch.workOrderItems.length > 0) {
      throw new BadRequestException(`Work order items already exist for batch ${batchId}`);
    }

    const items = await this.prisma.$transaction(
      Array.from({ length: batch.quantity }, (_, i) =>
        this.prisma.workOrderItem.create({
          data: {
            batchId,
            serialNumber: `${batch.batchId}-${String(i + 1).padStart(3, '0')}`,
            itemNumber: i + 1,
            status: WorkOrderItemStatus.QUEUED,
            stepProgress: {
              create: batch.routingSteps.map((step) => ({
                routingStepId: step.id,
                status: StepStatus.PENDING,
              })),
            },
          },
          include: { stepProgress: true },
        }),
      ),
    );

    await this.prisma.batch.update({
      where: { id: batchId },
      data: { status: 'IN_PROGRESS' },
    });

    return items;
  }

  findByBatch(batchId: string) {
    return this.prisma.workOrderItem.findMany({
      where: { batchId },
      include: {
        stepProgress: {
          include: { routingStep: { include: { workstation: true } } },
          orderBy: { routingStep: { stepNumber: 'asc' } },
        },
        qualityChecks: { orderBy: { checkedAt: 'desc' } },
        materialUsage: { include: { materialPart: true } },
      },
      orderBy: { itemNumber: 'asc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.workOrderItem.findUnique({
      where: { id },
      include: {
        batch: { include: { lineItem: { include: { part: true } } } },
        stepProgress: {
          include: { routingStep: { include: { workstation: true } } },
          orderBy: { routingStep: { stepNumber: 'asc' } },
        },
        qualityChecks: { orderBy: { checkedAt: 'desc' } },
        materialUsage: { include: { materialPart: true, routingStep: true } },
      },
    });
    if (!item) throw new NotFoundException(`Work order item ${id} not found`);
    return item;
  }

  async startStep(itemId: string, stepId: string, dto: AdvanceStepDto) {
    const progress = await this.prisma.workOrderStepProgress.findUnique({
      where: { workOrderItemId_routingStepId: { workOrderItemId: itemId, routingStepId: stepId } },
    });
    if (!progress) throw new NotFoundException(`Step progress not found`);

    return this.prisma.$transaction([
      this.prisma.workOrderStepProgress.update({
        where: { workOrderItemId_routingStepId: { workOrderItemId: itemId, routingStepId: stepId } },
        data: {
          status: StepStatus.IN_PROGRESS,
          startedAt: new Date(),
          operatorId: dto.operatorId,
          notes: dto.notes,
        },
      }),
      this.prisma.workOrderItem.update({
        where: { id: itemId },
        data: { status: WorkOrderItemStatus.IN_PROGRESS, currentStepId: stepId, startedAt: new Date() },
      }),
    ]);
  }

  async completeStep(itemId: string, stepId: string, dto: AdvanceStepDto) {
    const [item, routingStep] = await Promise.all([
      this.prisma.workOrderItem.findUnique({
        where: { id: itemId },
        include: {
          stepProgress: {
            include: { routingStep: true },
            orderBy: { routingStep: { stepNumber: 'asc' } },
          },
        },
      }),
      this.prisma.routingStep.findUnique({ where: { id: stepId } }),
    ]);
    if (!item) throw new NotFoundException(`Work order item ${itemId} not found`);
    if (!routingStep) throw new NotFoundException(`Routing step ${stepId} not found`);

    const nextStep = item.stepProgress.find(
      (p) => p.routingStep.stepNumber > routingStep.stepNumber && p.status === StepStatus.PENDING,
    );
    const isLastStep = !nextStep;
    const allComplete = isLastStep && (await this.checkBatchCompletion(item.batchId, itemId));

    return this.prisma.$transaction(async (tx) => {
      await tx.workOrderStepProgress.update({
        where: { workOrderItemId_routingStepId: { workOrderItemId: itemId, routingStepId: stepId } },
        data: {
          status: StepStatus.COMPLETED,
          completedAt: new Date(),
          operatorId: dto.operatorId,
          actualTime: dto.actualTime,
          notes: dto.notes,
          photoUrl: dto.photoUrl,
        },
      });

      await tx.workOrderItem.update({
        where: { id: itemId },
        data: isLastStep
          ? { status: WorkOrderItemStatus.COMPLETED, completedAt: new Date(), currentStepId: null }
          : { currentStepId: nextStep!.routingStepId },
      });

      if (allComplete) {
        await tx.batch.update({
          where: { id: item.batchId },
          data: { status: 'COMPLETED', actualCompletion: new Date() },
        });
      }
    });
  }

  async recordMaterialUsage(itemId: string, dto: RecordMaterialUsageDto) {
    await this.findOne(itemId);
    const existing = await this.prisma.workOrderMaterialUsage.findFirst({
      where: {
        workOrderItemId: itemId,
        materialPartId: dto.materialPartId,
        routingStepId: dto.routingStepId ?? null,
      },
    });
    if (existing) {
      return this.prisma.workOrderMaterialUsage.update({
        where: { id: existing.id },
        data: { quantityUsed: dto.quantityUsed, unitCost: dto.unitCost, notes: dto.notes },
      });
    }
    return this.prisma.workOrderMaterialUsage.create({
      data: {
        workOrderItemId: itemId,
        materialPartId: dto.materialPartId,
        routingStepId: dto.routingStepId,
        quantityUsed: dto.quantityUsed,
        unitCost: dto.unitCost,
        operatorId: dto.operatorId,
        notes: dto.notes,
      },
    });
  }

  async recordQualityCheck(itemId: string, dto: RecordQualityCheckDto) {
    await this.findOne(itemId);
    return this.prisma.workOrderQualityCheck.create({
      data: {
        workOrderItemId: itemId,
        routingStepId: dto.routingStepId,
        checkType: dto.checkType,
        result: dto.result,
        checkedBy: dto.checkedBy,
        measurements: dto.measurements ?? undefined,
        defects: dto.defects,
        correctedBy: dto.correctedBy,
        notes: dto.notes,
      },
    });
  }

  async setItemStatus(itemId: string, status: WorkOrderItemStatus, notes?: string) {
    await this.findOne(itemId);
    return this.prisma.workOrderItem.update({
      where: { id: itemId },
      data: { status, notes },
    });
  }

  private async checkBatchCompletion(batchId: string, justCompletedItemId: string): Promise<boolean> {
    const items = await this.prisma.workOrderItem.findMany({
      where: { batchId },
      select: { id: true, status: true },
    });
    return items.every(
      (i) => i.id === justCompletedItemId || i.status === WorkOrderItemStatus.COMPLETED,
    );
  }
}
