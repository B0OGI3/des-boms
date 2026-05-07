import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQcRecordDto } from './dto/create-qc-record.dto';

@Injectable()
export class QcService {
  constructor(private readonly prisma: PrismaService) {}

  findForBatch(batchId: string) {
    return this.prisma.qCRecord.findMany({
      where: { batchId },
      orderBy: { inspectionDate: 'desc' },
    });
  }

  create(batchId: string, dto: CreateQcRecordDto) {
    return this.prisma.qCRecord.create({
      data: {
        batchId,
        inspector: dto.inspector,
        result: dto.result,
        notes: dto.notes,
        inspectionDate: new Date(),
      },
    });
  }
}
