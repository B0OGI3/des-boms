import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { CustomersService } from './customers.service';

const mockPrisma = {
  customer: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

const customer = {
  id: 'cust-1',
  name: 'Acme',
  contactName: 'Jane',
  email: 'jane@acme.com',
  phone: null,
  billingAddress: null,
  shippingAddress: null,
  notes: null,
  quickbooksId: null,
  syncStatus: 'PENDING',
  lastSyncedAt: null,
  syncError: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

let service: CustomersService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new CustomersService(mockPrisma as never);
});

describe('CustomersService', () => {
  describe('findAll', () => {
    it('returns all customers when no search term', async () => {
      mockPrisma.customer.findMany.mockResolvedValue([customer]);
      const result = await service.findAll();
      expect(result).toEqual([customer]);
      expect(mockPrisma.customer.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: undefined }),
      );
    });

    it('passes OR search filter when search term provided', async () => {
      mockPrisma.customer.findMany.mockResolvedValue([customer]);
      await service.findAll('acme');
      expect(mockPrisma.customer.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            OR: [
              { name: { contains: 'acme', mode: 'insensitive' } },
              { email: { contains: 'acme', mode: 'insensitive' } },
              { contactName: { contains: 'acme', mode: 'insensitive' } },
            ],
          },
        }),
      );
    });
  });

  describe('findOne', () => {
    it('returns customer when found', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue(customer);
      const result = await service.findOne('cust-1');
      expect(result).toEqual(customer);
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates customer with provided fields', async () => {
      const dto = { name: 'New Co', email: 'new@co.com' };
      mockPrisma.customer.create.mockResolvedValue({ ...customer, ...dto });
      const result = await service.create(dto as never);
      expect(mockPrisma.customer.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ name: 'New Co', email: 'new@co.com' }) }),
      );
      expect(result.name).toBe('New Co');
    });
  });

  describe('update', () => {
    it('updates customer fields', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue(customer);
      mockPrisma.customer.update.mockResolvedValue({ ...customer, name: 'Updated' });
      const result = await service.update('cust-1', { name: 'Updated' } as never);
      expect(result.name).toBe('Updated');
    });

    it('throws NotFoundException when customer does not exist', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue(null);
      await expect(service.update('bad-id', {} as never)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deletes customer', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue(customer);
      mockPrisma.customer.delete.mockResolvedValue(customer);
      await service.remove('cust-1');
      expect(mockPrisma.customer.delete).toHaveBeenCalledWith({ where: { id: 'cust-1' } });
    });

    it('throws NotFoundException when customer does not exist', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue(null);
      await expect(service.remove('bad-id')).rejects.toThrow(NotFoundException);
    });
  });
});
