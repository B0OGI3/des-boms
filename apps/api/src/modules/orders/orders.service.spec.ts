import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';

const mockPrisma = {
  purchaseOrder: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

const order = {
  id: 'order-1',
  systemOrderId: 'sys-1',
  customerId: 'cust-1',
  poNumber: 'PO-001',
  dueDate: new Date('2026-12-01'),
  priority: 'STANDARD',
  orderStatus: 'ACTIVE',
  notes: null,
  completedAt: null,
  completedBy: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

let service: OrdersService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new OrdersService(mockPrisma as never);
});

describe('OrdersService', () => {
  describe('findAll', () => {
    it('returns all orders when no customerId filter', async () => {
      mockPrisma.purchaseOrder.findMany.mockResolvedValue([order]);
      const result = await service.findAll();
      expect(result).toEqual([order]);
      expect(mockPrisma.purchaseOrder.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: undefined }),
      );
    });

    it('filters by customerId when provided', async () => {
      mockPrisma.purchaseOrder.findMany.mockResolvedValue([order]);
      await service.findAll('cust-1');
      expect(mockPrisma.purchaseOrder.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { customerId: 'cust-1' } }),
      );
    });
  });

  describe('findOne', () => {
    it('returns order when found', async () => {
      mockPrisma.purchaseOrder.findUnique.mockResolvedValue(order);
      const result = await service.findOne('order-1');
      expect(result).toEqual(order);
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.purchaseOrder.findUnique.mockResolvedValue(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('parses dueDate string to Date and creates order', async () => {
      const dto = { customerId: 'cust-1', poNumber: 'PO-002', dueDate: '2026-12-01' };
      mockPrisma.purchaseOrder.create.mockResolvedValue(order);
      await service.create(dto as never);
      const data = mockPrisma.purchaseOrder.create.mock.calls[0][0].data;
      expect(data.dueDate).toBeInstanceOf(Date);
      expect(data.customerId).toBe('cust-1');
      expect(data.poNumber).toBe('PO-002');
    });

    it('creates line items when provided', async () => {
      const dto = {
        customerId: 'cust-1',
        poNumber: 'PO-002',
        dueDate: '2026-12-01',
        lineItems: [{ partId: 'part-1', quantity: 5, unitPrice: 10 }],
      };
      mockPrisma.purchaseOrder.create.mockResolvedValue(order);
      await service.create(dto as never);
      const data = mockPrisma.purchaseOrder.create.mock.calls[0][0].data;
      expect(data.lineItems.create).toHaveLength(1);
      expect(data.lineItems.create[0].partId).toBe('part-1');
    });
  });

  describe('update', () => {
    it('updates order fields', async () => {
      mockPrisma.purchaseOrder.findUnique.mockResolvedValue(order);
      mockPrisma.purchaseOrder.update.mockResolvedValue({ ...order, orderStatus: 'COMPLETED' });
      const result = await service.update('order-1', { orderStatus: 'COMPLETED' as never });
      expect(result.orderStatus).toBe('COMPLETED');
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.purchaseOrder.findUnique.mockResolvedValue(null);
      await expect(service.update('bad-id', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deletes order', async () => {
      mockPrisma.purchaseOrder.findUnique.mockResolvedValue(order);
      mockPrisma.purchaseOrder.delete.mockResolvedValue(order);
      await service.remove('order-1');
      expect(mockPrisma.purchaseOrder.delete).toHaveBeenCalledWith({ where: { id: 'order-1' } });
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.purchaseOrder.findUnique.mockResolvedValue(null);
      await expect(service.remove('bad-id')).rejects.toThrow(NotFoundException);
    });
  });
});
