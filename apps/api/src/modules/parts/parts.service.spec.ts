import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { PartsService } from './parts.service';

const mockPrisma = {
  part: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
};

const part = {
  id: 'part-1',
  partNumber: 'RM-STEEL-001',
  partName: 'Steel Sheet',
  partType: 'RAW_MATERIAL',
  drawingNumber: null,
  revisionLevel: 'A',
  description: null,
  materialSpec: null,
  unitOfMeasure: 'EA',
  active: true,
  notes: null,
  recommendedRoutingTemplateId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

let service: PartsService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new PartsService(mockPrisma as never);
});

describe('PartsService', () => {
  describe('findAll', () => {
    it('returns active parts by default', async () => {
      mockPrisma.part.findMany.mockResolvedValue([part]);
      await service.findAll();
      expect(mockPrisma.part.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { active: true } }),
      );
    });

    it('filters by type when provided', async () => {
      mockPrisma.part.findMany.mockResolvedValue([part]);
      await service.findAll('RAW_MATERIAL');
      expect(mockPrisma.part.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { active: true, partType: 'RAW_MATERIAL' } }),
      );
    });

    it('can return inactive parts', async () => {
      mockPrisma.part.findMany.mockResolvedValue([]);
      await service.findAll(undefined, false);
      expect(mockPrisma.part.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { active: false } }),
      );
    });
  });

  describe('findOne', () => {
    it('returns part when found', async () => {
      mockPrisma.part.findUnique.mockResolvedValue(part);
      const result = await service.findOne('part-1');
      expect(result).toEqual(part);
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.part.findUnique.mockResolvedValue(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates part with provided fields', async () => {
      const dto = { partNumber: 'NEW-001', partName: 'New Part', partType: 'RAW_MATERIAL', unitOfMeasure: 'EA' };
      mockPrisma.part.create.mockResolvedValue({ ...part, ...dto });
      const result = await service.create(dto as never);
      expect(mockPrisma.part.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ partNumber: 'NEW-001' }) }),
      );
      expect(result.partNumber).toBe('NEW-001');
    });
  });

  describe('remove', () => {
    it('soft-deletes by setting active to false', async () => {
      mockPrisma.part.findUnique.mockResolvedValue(part);
      mockPrisma.part.update.mockResolvedValue({ ...part, active: false });
      await service.remove('part-1');
      expect(mockPrisma.part.update).toHaveBeenCalledWith({
        where: { id: 'part-1' },
        data: { active: false },
      });
    });
  });
});
