import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { WorkOrdersService } from './work-orders.service';
import { AdvanceStepDto } from './dto/advance-step.dto';
import { RecordMaterialUsageDto } from './dto/record-material-usage.dto';
import { RecordQualityCheckDto } from './dto/record-quality-check.dto';

@Controller('work-orders')
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  // Spawn work order items for a batch (one item per unit of quantity)
  @Post('batch/:batchId/spawn')
  spawnItems(@Param('batchId') batchId: string) {
    return this.workOrdersService.spawnItems(batchId);
  }

  // Get all items for a batch with their current step progress
  @Get('batch/:batchId')
  findByBatch(@Param('batchId') batchId: string) {
    return this.workOrdersService.findByBatch(batchId);
  }

  // Get a single work order item with full history
  @Get('item/:id')
  findOne(@Param('id') id: string) {
    return this.workOrdersService.findOne(id);
  }

  // Start an item at a specific routing step
  @Put('item/:id/start-step/:stepId')
  startStep(@Param('id') id: string, @Param('stepId') stepId: string, @Body() dto: AdvanceStepDto) {
    return this.workOrdersService.startStep(id, stepId, dto);
  }

  // Complete a routing step for an item
  @Put('item/:id/complete-step/:stepId')
  completeStep(@Param('id') id: string, @Param('stepId') stepId: string, @Body() dto: AdvanceStepDto) {
    return this.workOrdersService.completeStep(id, stepId, dto);
  }

  // Record material consumption at a step
  @Post('item/:id/material-usage')
  recordMaterialUsage(@Param('id') id: string, @Body() dto: RecordMaterialUsageDto) {
    return this.workOrdersService.recordMaterialUsage(id, dto);
  }

  // Record a quality check at a step
  @Post('item/:id/quality-check')
  recordQualityCheck(@Param('id') id: string, @Body() dto: RecordQualityCheckDto) {
    return this.workOrdersService.recordQualityCheck(id, dto);
  }

  // Mark an item as scrapped
  @Put('item/:id/scrap')
  scrapItem(@Param('id') id: string, @Body('notes') notes: string) {
    return this.workOrdersService.setItemStatus(id, 'SCRAPPED', notes);
  }

  // Mark an item as requiring rework
  @Put('item/:id/rework')
  reworkItem(@Param('id') id: string, @Body('notes') notes: string) {
    return this.workOrdersService.setItemStatus(id, 'REWORK', notes);
  }
}
