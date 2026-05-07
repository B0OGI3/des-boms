import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { WorkstationsService } from './workstations.service';
import { CreateWorkstationDto } from './dto/create-workstation.dto';
import { OperatorLoginDto } from './dto/operator-login.dto';

@Controller('workstations')
export class WorkstationsController {
  constructor(private readonly workstationsService: WorkstationsService) {}

  @Get()
  findAll() {
    return this.workstationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workstationsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateWorkstationDto) {
    return this.workstationsService.create(dto);
  }

  @Post(':id/operator/login')
  operatorLogin(@Param('id') id: string, @Body() dto: OperatorLoginDto) {
    return this.workstationsService.operatorLogin(id, dto);
  }

  @Post(':id/operator/logout')
  operatorLogout(@Param('id') id: string, @Body() dto: OperatorLoginDto) {
    return this.workstationsService.operatorLogout(id, dto.operatorId);
  }
}
