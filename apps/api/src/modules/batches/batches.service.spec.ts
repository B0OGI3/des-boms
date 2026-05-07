import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { BatchesService } from './batches.service';

const mockPrisma = {
  batch: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
};

const batch = {
  id: 'batch-1',
  batchId: 'BATCH-001',
  lineItemId: 'li-1',
  quantity: 10,
  status: 'PENDING',
  priority: 'STANDARD',
  notes: null,
  startDate: null,
  estimatedCompletion: null,
  actualCompletion: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

let service: BatchesService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new BatchesService(mockPrisma as never);
});

describe('BatchesService', () => {
  describe('findAll', () => {
    it('returns all batches when no filter', async () => {
      mockPrisma.batch.findMany.mockResolvedValue([batch]);
      const result = await service.findAll();
      expect(result).toEqual([batch]);
      expect(mockPrisma.batch.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: undefined }),
      );
    });

    it('filters by lineItemId when provided', async () => {
      mockPrisma.batch.findMany.mockResolvedValue([batch]);
      await service.findAll('li-1');
      expect(mockPrisma.batch.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { lineItemId: 'li-1' } }),
      );
    });
  });

  describe('findOne', () => {
    it('returns batch when found', async () => {
      mockPrisma.batch.findUnique.mockResolvedValue(batch);
      const result = await service.findOne('batch-1');
      expect(result).toEqual(batch);
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.batch.findUnique.mockResolvedValue(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('generates batchId and creates batch', async () => {
      const dto = { lineItemId: 'li-1', quantity: 5 };
      mockPrisma.batch.create.mockResolvedValue({ ...batch, ...dto });
      await service.create(dto as never);
      const callData = mockPrisma.batch.create.mock.calls[0][0].data;
      expect(callData.batchId).toMatch(/^BATCH-\d+$/);
      expect(callData.lineItemId).toBe('li-1');
      expect(callData.quantity).toBe(5);
    });

    it('parses date strings to Date objects', async () => {
      const dto = { lineItemId: 'li-1', quantity: 5, startDate: '2026-06-01', estimatedCompletion: '2026-07-01' };
      mockPrisma.batch.create.mockResolvedValue(batch);
      await service.create(dto as never);
      const callData = mockPrisma.batch.create.mock.calls[0][0].data;
      expect(callData.startDate).toBeInstanceOf(Date);
      expect(callData.estimatedCompletion).toBeInstanceOf(Date);
    });
  });

  describe('update', () => {
    it('updates batch status and notes', async () => {
      mockPrisma.batch.findUnique.mockResolvedValue(batch);
      mockPrisma.batch.update.mockResolvedValue({ ...batch, status: 'IN_PROGRESS', notes: 'started' });
      const result = await service.update('batch-1', { status: 'IN_PROGRESS' as never, notes: 'started' });
      expect(result.status).toBe('IN_PROGRESS');
    });

    it('throws NotFoundException when batch not found', async () => {
      mockPrisma.batch.findUnique.mockResolvedValue(null);
      await expect(service.update('bad-id', {})).rejects.toThrow(NotFoundException);
    });
  });
});
