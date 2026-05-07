import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(customerId?: string) {
    return this.prisma.purchaseOrder.findMany({
      where: customerId ? { customerId } : undefined,
      include: {
        customer: true,
        lineItems: { include: { part: true, batches: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.purchaseOrder.findUnique({
      where: { id },
      include: {
        customer: true,
        lineItems: {
          include: {
            part: true,
            bomRevision: { include: { components: { include: { childPart: true } } } },
            batches: { include: { routingSteps: true } },
            fileAttachments: true,
          },
        },
      },
    });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

  async create(dto: CreateOrderDto) {
    return this.prisma.purchaseOrder.create({
      data: {
        customerId: dto.customerId,
        poNumber: dto.poNumber,
        dueDate: new Date(dto.dueDate),
        priority: dto.priority,
        notes: dto.notes,
        lineItems: {
          create: dto.lineItems?.map((li) => ({
            partId: li.partId,
            bomRevisionId: li.bomRevisionId,
            quantity: li.quantity,
            unitPrice: li.unitPrice,
            dueDate: li.dueDate ? new Date(li.dueDate) : undefined,
            notes: li.notes,
          })),
        },
      },
      include: { customer: true, lineItems: { include: { part: true } } },
    });
  }

  async update(id: string, dto: UpdateOrderDto) {
    await this.findOne(id);
    return this.prisma.purchaseOrder.update({
      where: { id },
      data: {
        poNumber: dto.poNumber,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        priority: dto.priority,
        notes: dto.notes,
        orderStatus: dto.orderStatus,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.purchaseOrder.delete({ where: { id } });
  }
}
