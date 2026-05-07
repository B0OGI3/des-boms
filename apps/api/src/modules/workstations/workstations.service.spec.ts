import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { WorkstationsService } from './workstations.service';

const mockPrisma = {
  workstation: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
  },
  workstationOperator: {
    update: vi.fn(),
  },
};

const workstation = {
  id: 'ws-1',
  name: 'CNC-01',
  description: 'CNC Machining Center',
  category: 'MACHINING',
  location: 'Bay A',
  serialNumber: null,
  manufacturer: null,
  model: null,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

let service: WorkstationsService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new WorkstationsService(mockPrisma as never);
});

describe('WorkstationsService', () => {
  describe('findAll', () => {
    it('returns all workstations with operators and capacity', async () => {
      mockPrisma.workstation.findMany.mockResolvedValue([workstation]);
      const result = await service.findAll();
      expect(result).toEqual([workstation]);
      expect(mockPrisma.workstation.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ orderBy: { name: 'asc' } }),
      );
    });
  });

  describe('findOne', () => {
    it('returns workstation when found', async () => {
      mockPrisma.workstation.findUnique.mockResolvedValue(workstation);
      const result = await service.findOne('ws-1');
      expect(result).toEqual(workstation);
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.workstation.findUnique.mockResolvedValue(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates workstation with provided fields', async () => {
      const dto = { name: 'WELD-02', category: 'WELDING', location: 'Bay B' };
      mockPrisma.workstation.create.mockResolvedValue(workstation);
      await service.create(dto as never);
      expect(mockPrisma.workstation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ name: 'WELD-02', category: 'WELDING' }),
        }),
      );
    });
  });

  describe('operatorLogin', () => {
    it('assigns operator to workstation with login time', async () => {
      mockPrisma.workstation.findUnique.mockResolvedValue(workstation);
      mockPrisma.workstationOperator.update.mockResolvedValue({});
      await service.operatorLogin('ws-1', { operatorId: 'op-1' } as never);
      const data = mockPrisma.workstationOperator.update.mock.calls[0][0].data;
      expect(data.currentWorkstationId).toBe('ws-1');
      expect(data.loginTime).toBeInstanceOf(Date);
      expect(data.logoutTime).toBeNull();
    });

    it('throws NotFoundException when workstation not found', async () => {
      mockPrisma.workstation.findUnique.mockResolvedValue(null);
      await expect(service.operatorLogin('bad-id', { operatorId: 'op-1' } as never)).rejects.toThrow(NotFoundException);
    });
  });

  describe('operatorLogout', () => {
    it('clears workstation assignment and sets logout time', async () => {
      mockPrisma.workstationOperator.update.mockResolvedValue({});
      await service.operatorLogout('ws-1', 'op-1');
      const data = mockPrisma.workstationOperator.update.mock.calls[0][0].data;
      expect(data.currentWorkstationId).toBeNull();
      expect(data.logoutTime).toBeInstanceOf(Date);
    });
  });
});
