import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWorkstationDto } from './dto/create-workstation.dto';
import { OperatorLoginDto } from './dto/operator-login.dto';

@Injectable()
export class WorkstationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.workstation.findMany({
      include: {
        currentOperators: true,
        capacity: true,
        routingSteps: {
          where: { status: { in: ['IN_PROGRESS', 'PENDING'] } },
          include: { batch: true },
          take: 5,
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const ws = await this.prisma.workstation.findUnique({
      where: { id },
      include: { currentOperators: true, capacity: true },
    });
    if (!ws) throw new NotFoundException(`Workstation ${id} not found`);
    return ws;
  }

  create(dto: CreateWorkstationDto) {
    return this.prisma.workstation.create({
      data: {
        name: dto.name,
        description: dto.description,
        category: dto.category,
        location: dto.location,
        serialNumber: dto.serialNumber,
        manufacturer: dto.manufacturer,
        model: dto.model,
      },
    });
  }

  async operatorLogin(workstationId: string, dto: OperatorLoginDto) {
    await this.findOne(workstationId);
    return this.prisma.workstationOperator.update({
      where: { operatorId: dto.operatorId },
      data: {
        currentWorkstationId: workstationId,
        loginTime: new Date(),
        logoutTime: null,
      },
    });
  }

  async operatorLogout(workstationId: string, operatorId: string) {
    return this.prisma.workstationOperator.update({
      where: { operatorId },
      data: {
        currentWorkstationId: null,
        logoutTime: new Date(),
      },
    });
  }
}
