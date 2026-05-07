import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { QcService } from './qc.service';
import { CreateQcRecordDto } from './dto/create-qc-record.dto';

@Controller('qc')
export class QcController {
  constructor(private readonly qcService: QcService) {}

  @Get('batch/:batchId')
  findForBatch(@Param('batchId') batchId: string) {
    return this.qcService.findForBatch(batchId);
  }

  @Post('batch/:batchId')
  create(@Param('batchId') batchId: string, @Body() dto: CreateQcRecordDto) {
    return this.qcService.create(batchId, dto);
  }
}
