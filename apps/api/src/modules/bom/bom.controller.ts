import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { BomService } from './bom.service';
import { CreateBomRevisionDto } from './dto/create-bom-revision.dto';
import { AddComponentDto } from './dto/add-component.dto';

@Controller('bom')
export class BomController {
  constructor(private readonly bomService: BomService) {}

  @Get('part/:partId')
  getRevisionsForPart(@Param('partId') partId: string) {
    return this.bomService.getRevisionsForPart(partId);
  }

  @Get('revision/:id')
  getRevision(@Param('id') id: string) {
    return this.bomService.getRevision(id);
  }

  @Post('revision')
  createRevision(@Body() dto: CreateBomRevisionDto) {
    return this.bomService.createRevision(dto);
  }

  @Post('revision/:id/component')
  addComponent(@Param('id') id: string, @Body() dto: AddComponentDto) {
    return this.bomService.addComponent(id, dto);
  }

  @Put('revision/:id/activate')
  activate(@Param('id') id: string) {
    return this.bomService.setActive(id, true);
  }

  @Put('revision/:id/obsolete')
  obsolete(@Param('id') id: string) {
    return this.bomService.setActive(id, false);
  }
}
