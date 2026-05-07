import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Get('line-item/:lineItemId')
  findForLineItem(@Param('lineItemId') lineItemId: string) {
    return this.uploadsService.findForLineItem(lineItemId);
  }

  @Post('line-item/:lineItemId')
  create(@Param('lineItemId') lineItemId: string, @Body() dto: CreateAttachmentDto) {
    return this.uploadsService.create(lineItemId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadsService.remove(id);
  }
}
