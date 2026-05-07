import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { BomService } from './bom.service';

const mockPrisma = {
  bOMRevision: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  bOMComponent: {
    create: vi.fn(),
  },
};

const revision = {
  id: 'rev-1',
  partId: 'part-1',
  revisionNumber: 'A',
  description: 'Initial revision',
  effectiveDate: new Date('2026-01-01'),
  active: true,
  obsoleteDate: null,
  createdBy: 'eng-1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

let service: BomService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new BomService(mockPrisma as never);
});

describe('BomService', () => {
  describe('getRevisionsForPart', () => {
    it('returns revisions ordered by effectiveDate desc', async () => {
      mockPrisma.bOMRevision.findMany.mockResolvedValue([revision]);
      const result = await service.getRevisionsForPart('part-1');
      expect(result).toEqual([revision]);
      expect(mockPrisma.bOMRevision.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { partId: 'part-1' },
          orderBy: { effectiveDate: 'desc' },
        }),
      );
    });
  });

  describe('getRevision', () => {
    it('returns revision when found', async () => {
      mockPrisma.bOMRevision.findUnique.mockResolvedValue(revision);
      const result = await service.getRevision('rev-1');
      expect(result).toEqual(revision);
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.bOMRevision.findUnique.mockResolvedValue(null);
      await expect(service.getRevision('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createRevision', () => {
    it('parses effectiveDate and creates revision', async () => {
      const dto = { partId: 'part-1', revisionNumber: 'B', effectiveDate: '2026-06-01', createdBy: 'eng-1' };
      mockPrisma.bOMRevision.create.mockResolvedValue(revision);
      await service.createRevision(dto as never);
      const data = mockPrisma.bOMRevision.create.mock.calls[0][0].data;
      expect(data.effectiveDate).toBeInstanceOf(Date);
      expect(data.partId).toBe('part-1');
      expect(data.revisionNumber).toBe('B');
    });
  });

  describe('addComponent', () => {
    it('creates component after verifying revision exists', async () => {
      mockPrisma.bOMRevision.findUnique.mockResolvedValue(revision);
      mockPrisma.bOMComponent.create.mockResolvedValue({ id: 'comp-1' });
      const dto = { childPartId: 'part-2', quantity: 3, unitOfMeasure: 'EA' };
      await service.addComponent('rev-1', dto as never);
      expect(mockPrisma.bOMComponent.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ bomRevisionId: 'rev-1', childPartId: 'part-2', quantity: 3 }),
        }),
      );
    });

    it('throws NotFoundException when revision does not exist', async () => {
      mockPrisma.bOMRevision.findUnique.mockResolvedValue(null);
      await expect(service.addComponent('bad-id', {} as never)).rejects.toThrow(NotFoundException);
    });
  });

  describe('setActive', () => {
    it('sets obsoleteDate to null when activating', async () => {
      mockPrisma.bOMRevision.findUnique.mockResolvedValue(revision);
      mockPrisma.bOMRevision.update.mockResolvedValue({ ...revision, active: true });
      await service.setActive('rev-1', true);
      expect(mockPrisma.bOMRevision.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { active: true, obsoleteDate: null } }),
      );
    });

    it('sets obsoleteDate when deactivating', async () => {
      mockPrisma.bOMRevision.findUnique.mockResolvedValue(revision);
      mockPrisma.bOMRevision.update.mockResolvedValue({ ...revision, active: false });
      await service.setActive('rev-1', false);
      const data = mockPrisma.bOMRevision.update.mock.calls[0][0].data;
      expect(data.active).toBe(false);
      expect(data.obsoleteDate).toBeInstanceOf(Date);
    });
  });
});
