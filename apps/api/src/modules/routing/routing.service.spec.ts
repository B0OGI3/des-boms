import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { RoutingService } from './routing.service';

const mockPrisma = {
  routingTemplate: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
  },
  routingStep: { create: vi.fn() },
  stepConfirmation: { create: vi.fn() },
  $transaction: vi.fn(),
};

const templateStep = {
  id: 'ts-1',
  stepNumber: 1,
  workstationId: 'ws-1',
  description: 'CNC Machining',
  estimatedTime: 60,
  required: true,
  notes: null,
};

const template = {
  id: 'tmpl-1',
  name: 'Standard Fabrication',
  description: null,
  active: true,
  templateSteps: [templateStep],
  createdAt: new Date(),
  updatedAt: new Date(),
};

let service: RoutingService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new RoutingService(mockPrisma as never);
});

describe('RoutingService', () => {
  describe('findTemplates', () => {
    it('returns only active templates', async () => {
      mockPrisma.routingTemplate.findMany.mockResolvedValue([template]);
      const result = await service.findTemplates();
      expect(result).toEqual([template]);
      expect(mockPrisma.routingTemplate.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { active: true } }),
      );
    });
  });

  describe('findTemplate', () => {
    it('returns template when found', async () => {
      mockPrisma.routingTemplate.findUnique.mockResolvedValue(template);
      const result = await service.findTemplate('tmpl-1');
      expect(result).toEqual(template);
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.routingTemplate.findUnique.mockResolvedValue(null);
      await expect(service.findTemplate('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTemplate', () => {
    it('creates template with steps when provided', async () => {
      const dto = {
        name: 'New Template',
        steps: [{ stepNumber: 1, workstationId: 'ws-1', description: 'Step 1', required: true }],
      };
      mockPrisma.routingTemplate.create.mockResolvedValue(template);
      await service.createTemplate(dto as never);
      const data = mockPrisma.routingTemplate.create.mock.calls[0][0].data;
      expect(data.name).toBe('New Template');
      expect(data.templateSteps.create).toHaveLength(1);
      expect(data.templateSteps.create[0].required).toBe(true);
    });

    it('defaults required to true when not specified', async () => {
      const dto = {
        name: 'New Template',
        steps: [{ stepNumber: 1, workstationId: 'ws-1', description: 'Step 1' }],
      };
      mockPrisma.routingTemplate.create.mockResolvedValue(template);
      await service.createTemplate(dto as never);
      const step = mockPrisma.routingTemplate.create.mock.calls[0][0].data.templateSteps.create[0];
      expect(step.required).toBe(true);
    });
  });

  describe('applyTemplateToBatch', () => {
    it('throws NotFoundException when template not found', async () => {
      mockPrisma.routingTemplate.findUnique.mockResolvedValue(null);
      await expect(service.applyTemplateToBatch('batch-1', 'bad-tmpl')).rejects.toThrow(NotFoundException);
    });

    it('creates one routing step per template step in a transaction', async () => {
      mockPrisma.routingTemplate.findUnique.mockResolvedValue(template);
      mockPrisma.$transaction.mockResolvedValue([]);
      await service.applyTemplateToBatch('batch-1', 'tmpl-1');
      const txArg = mockPrisma.$transaction.mock.calls[0][0];
      expect(txArg).toHaveLength(template.templateSteps.length);
    });
  });

  describe('confirmStep', () => {
    it('creates a step confirmation with parsed dates', async () => {
      const dto = {
        workstationId: 'ws-1',
        operatorName: 'John',
        operatorId: 'op-1',
        startTime: '2026-05-07T08:00:00Z',
        endTime: '2026-05-07T09:00:00Z',
        status: 'COMPLETED',
      };
      mockPrisma.stepConfirmation.create.mockResolvedValue({ id: 'conf-1' });
      await service.confirmStep('step-1', dto as never);
      const data = mockPrisma.stepConfirmation.create.mock.calls[0][0].data;
      expect(data.stepId).toBe('step-1');
      expect(data.startTime).toBeInstanceOf(Date);
      expect(data.endTime).toBeInstanceOf(Date);
      expect(data.status).toBe('COMPLETED');
    });

    it('defaults status to COMPLETED when not provided', async () => {
      const dto = { workstationId: 'ws-1', operatorName: 'John', operatorId: 'op-1' };
      mockPrisma.stepConfirmation.create.mockResolvedValue({ id: 'conf-1' });
      await service.confirmStep('step-1', dto as never);
      const data = mockPrisma.stepConfirmation.create.mock.calls[0][0].data;
      expect(data.status).toBe('COMPLETED');
    });
  });
});
