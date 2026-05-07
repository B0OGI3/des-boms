import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { QuickbooksService } from './quickbooks.service';

@Controller('quickbooks')
export class QuickbooksController {
  constructor(private readonly qbService: QuickbooksService) {}

  @Get('status')
  status() {
    return this.qbService.getStatus();
  }

  @Get('connect')
  connect(@Res() res: Response) {
    const url = this.qbService.getAuthUrl();
    res.redirect(url);
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Query('realmId') realmId: string, @Res() res: Response) {
    await this.qbService.handleCallback(code, realmId);
    res.redirect(process.env.FRONTEND_URL ?? 'http://localhost:5173');
  }

  @Post('sync/customers')
  syncCustomers() {
    return this.qbService.syncCustomers();
  }
}
