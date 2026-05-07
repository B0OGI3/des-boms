import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { WorkOrdersService } from './work-orders.service';
import { WorkOrderItemStatus, StepStatus } from '@des-boms/shared';

const mockPrisma = {
  batch: { findUnique: vi.fn(), update: vi.fn() },
  workOrderItem: { create: vi.fn(), findUnique: vi.fn(), findMany: vi.fn(), update: vi.fn() },
  workOrderStepProgress: { findUnique: vi.fn(), update: vi.fn() },
  workOrderMaterialUsage: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn() },
  workOrderQualityCheck: { create: vi.fn() },
  routingStep: { findUnique: vi.fn() },
  $transaction: vi.fn(),
};

const routingStep1 = { id: 'step-1', stepNumber: 1, batchId: 'batch-1' };
const routingStep2 = { id: 'step-2', stepNumber: 2, batchId: 'batch-1' };

const batch = {
  id: 'batch-1',
  batchId: 'BATCH-001',
  quantity: 2,
  workOrderItems: [],
  routingSteps: [routingStep1, routingStep2],
};

const workOrderItem = {
  id: 'item-1',
  batchId: 'batch-1',
  serialNumber: 'BATCH-001-001',
  itemNumber: 1,
  status: WorkOrderItemStatus.QUEUED,
  currentStepId: null,
  startedAt: null,
  completedAt: null,
  notes: null,
  stepProgress: [
    { routingStepId: 'step-1', routingStep: routingStep1, status: StepStatus.PENDING },
    { routingStepId: 'step-2', routingStep: routingStep2, status: StepStatus.PENDING },
  ],
};

let service: WorkOrdersService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new WorkOrdersService(mockPrisma as never);
});

describe('WorkOrdersService', () => {
  describe('spawnItems', () => {
    it('throws NotFoundException when batch not found', async () => {
      mockPrisma.batch.findUnique.mockResolvedValue(null);
      await expect(service.spawnItems('bad-id')).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when items already exist', async () => {
      mockPrisma.batch.findUnique.mockResolvedValue({ ...batch, workOrderItems: [workOrderItem] });
      await expect(service.spawnItems('batch-1')).rejects.toThrow(BadRequestException);
    });

    it('creates one WorkOrderItem per unit with serial numbers', async () => {
      mockPrisma.batch.findUnique.mockResolvedValue(batch);
      mockPrisma.$transaction.mockResolvedValue([workOrderItem]);
      mockPrisma.batch.update.mockResolvedValue({ ...batch, status: 'IN_PROGRESS' });

      await service.spawnItems('batch-1');

      // $transaction receives an array of create promises for each unit
      const txArg = mockPrisma.$transaction.mock.calls[0][0];
      expect(txArg).toHaveLength(batch.quantity);
    });

    it('marks batch IN_PROGRESS after spawning', async () => {
      mockPrisma.batch.findUnique.mockResolvedValue(batch);
      mockPrisma.$transaction.mockResolvedValue([]);
      mockPrisma.batch.update.mockResolvedValue({});

      await service.spawnItems('batch-1');

      expect(mockPrisma.batch.update).toHaveBeenCalledWith({
        where: { id: 'batch-1' },
        data: { status: 'IN_PROGRESS' },
      });
    });
  });

  describe('startStep', () => {
    it('throws NotFoundException when step progress not found', async () => {
      mockPrisma.workOrderStepProgress.findUnique.mockResolvedValue(null);
      await expect(service.startStep('item-1', 'step-1', {} as never)).rejects.toThrow(NotFoundException);
    });

    it('sets step to IN_PROGRESS and updates item currentStepId', async () => {
      mockPrisma.workOrderStepProgress.findUnique.mockResolvedValue({ status: StepStatus.PENDING });
      mockPrisma.$transaction.mockResolvedValue([]);

      await service.startStep('item-1', 'step-1', { operatorId: 'op-1' } as never);

      expect(mockPrisma.$transaction).toHaveBeenCalledOnce();
      expect(mockPrisma.workOrderStepProgress.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ status: StepStatus.IN_PROGRESS, operatorId: 'op-1' }) }),
      );
      expect(mockPrisma.workOrderItem.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ status: WorkOrderItemStatus.IN_PROGRESS, currentStepId: 'step-1' }) }),
      );
    });
  });

  describe('completeStep', () => {
    it('throws NotFoundException when item not found', async () => {
      mockPrisma.workOrderItem.findUnique.mockResolvedValue(null);
      mockPrisma.routingStep.findUnique.mockResolvedValue(routingStep1);
      await expect(service.completeStep('bad-id', 'step-1', {} as never)).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException when routing step not found', async () => {
      mockPrisma.workOrderItem.findUnique.mockResolvedValue(workOrderItem);
      mockPrisma.routingStep.findUnique.mockResolvedValue(null);
      await expect(service.completeStep('item-1', 'bad-step', {} as never)).rejects.toThrow(NotFoundException);
    });

    it('runs completion in a transaction', async () => {
      mockPrisma.workOrderItem.findUnique.mockResolvedValue(workOrderItem);
      mockPrisma.routingStep.findUnique.mockResolvedValue(routingStep1);
      mockPrisma.workOrderItem.findMany.mockResolvedValue([workOrderItem]);

      const fakeTx = {
        workOrderStepProgress: { update: vi.fn() },
        workOrderItem: { update: vi.fn() },
        batch: { update: vi.fn() },
      };
      mockPrisma.$transaction.mockImplementation(async (fn: (tx: typeof fakeTx) => Promise<void>) => fn(fakeTx));

      await service.completeStep('item-1', 'step-1', { operatorId: 'op-1' } as never);

      expect(fakeTx.workOrderStepProgress.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ status: StepStatus.COMPLETED }) }),
      );
    });
  });

  describe('recordMaterialUsage', () => {
    it('updates existing record when one exists for item + material + step', async () => {
      const existing = { id: 'usage-1', workOrderItemId: 'item-1', materialPartId: 'part-1' };
      mockPrisma.workOrderItem.findUnique.mockResolvedValue(workOrderItem);
      mockPrisma.workOrderMaterialUsage.findFirst.mockResolvedValue(existing);
      mockPrisma.workOrderMaterialUsage.update.mockResolvedValue(existing);

      await service.recordMaterialUsage('item-1', {
        materialPartId: 'part-1',
        quantityUsed: 2,
        unitCost: 10,
      } as never);

      expect(mockPrisma.workOrderMaterialUsage.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'usage-1' } }),
      );
      expect(mockPrisma.workOrderMaterialUsage.create).not.toHaveBeenCalled();
    });

    it('creates new record when none exists', async () => {
      mockPrisma.workOrderItem.findUnique.mockResolvedValue(workOrderItem);
      mockPrisma.workOrderMaterialUsage.findFirst.mockResolvedValue(null);
      mockPrisma.workOrderMaterialUsage.create.mockResolvedValue({});

      await service.recordMaterialUsage('item-1', {
        materialPartId: 'part-1',
        quantityUsed: 1,
      } as never);

      expect(mockPrisma.workOrderMaterialUsage.create).toHaveBeenCalled();
      expect(mockPrisma.workOrderMaterialUsage.update).not.toHaveBeenCalled();
    });
  });

  describe('recordQualityCheck', () => {
    it('creates a quality check record', async () => {
      mockPrisma.workOrderItem.findUnique.mockResolvedValue(workOrderItem);
      mockPrisma.workOrderQualityCheck.create.mockResolvedValue({ id: 'qc-1' });

      await service.recordQualityCheck('item-1', {
        checkType: 'DIMENSIONAL',
        result: 'PASS',
        checkedBy: 'op-1',
      } as never);

      expect(mockPrisma.workOrderQualityCheck.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            workOrderItemId: 'item-1',
            checkType: 'DIMENSIONAL',
            result: 'PASS',
            checkedBy: 'op-1',
          }),
        }),
      );
    });

    it('throws NotFoundException when item not found', async () => {
      mockPrisma.workOrderItem.findUnique.mockResolvedValue(null);
      await expect(
        service.recordQualityCheck('bad-id', { checkType: 'DIMENSIONAL', result: 'PASS', checkedBy: 'op-1' } as never),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
