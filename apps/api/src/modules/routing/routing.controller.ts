import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RoutingService } from './routing.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { ConfirmStepDto } from './dto/confirm-step.dto';

@Controller('routing')
export class RoutingController {
  constructor(private readonly routingService: RoutingService) {}

  @Get('templates')
  findTemplates() {
    return this.routingService.findTemplates();
  }

  @Get('templates/:id')
  findTemplate(@Param('id') id: string) {
    return this.routingService.findTemplate(id);
  }

  @Post('templates')
  createTemplate(@Body() dto: CreateTemplateDto) {
    return this.routingService.createTemplate(dto);
  }

  @Post('batch/:batchId/from-template/:templateId')
  applyTemplate(@Param('batchId') batchId: string, @Param('templateId') templateId: string) {
    return this.routingService.applyTemplateToBatch(batchId, templateId);
  }

  @Post('step/:stepId/confirm')
  confirmStep(@Param('stepId') stepId: string, @Body() dto: ConfirmStepDto) {
    return this.routingService.confirmStep(stepId, dto);
  }
}
