import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QcService } from './qc.service';

const mockPrisma = {
  qCRecord: {
    findMany: vi.fn(),
    create: vi.fn(),
  },
};

const qcRecord = {
  id: 'qc-1',
  batchId: 'batch-1',
  inspector: 'insp-1',
  result: 'PASS',
  notes: 'Looks good',
  inspectionDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

let service: QcService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new QcService(mockPrisma as never);
});

describe('QcService', () => {
  describe('findForBatch', () => {
    it('returns QC records for batch ordered by date desc', async () => {
      mockPrisma.qCRecord.findMany.mockResolvedValue([qcRecord]);
      const result = await service.findForBatch('batch-1');
      expect(result).toEqual([qcRecord]);
      expect(mockPrisma.qCRecord.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { batchId: 'batch-1' },
          orderBy: { inspectionDate: 'desc' },
        }),
      );
    });
  });

  describe('create', () => {
    it('creates QC record with current inspectionDate', async () => {
      const dto = { inspector: 'insp-1', result: 'PASS', notes: 'All good' };
      mockPrisma.qCRecord.create.mockResolvedValue(qcRecord);
      await service.create('batch-1', dto as never);
      const data = mockPrisma.qCRecord.create.mock.calls[0][0].data;
      expect(data.batchId).toBe('batch-1');
      expect(data.inspector).toBe('insp-1');
      expect(data.result).toBe('PASS');
      expect(data.inspectionDate).toBeInstanceOf(Date);
    });

    it('creates record without notes when not provided', async () => {
      const dto = { inspector: 'insp-1', result: 'FAIL' };
      mockPrisma.qCRecord.create.mockResolvedValue({ ...qcRecord, notes: undefined });
      await service.create('batch-1', dto as never);
      expect(mockPrisma.qCRecord.create).toHaveBeenCalledOnce();
    });
  });
});
