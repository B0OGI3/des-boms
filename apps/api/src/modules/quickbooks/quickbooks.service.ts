import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class QuickbooksService {
  private readonly logger = new Logger(QuickbooksService.name);
  private connected = false;

  constructor(private readonly prisma: PrismaService) {}

  getStatus() {
    return {
      connected: this.connected,
      configured: !!(process.env.QB_CLIENT_ID && process.env.QB_CLIENT_SECRET),
    };
  }

  getAuthUrl(): string {
    if (!process.env.QB_CLIENT_ID) throw new Error('QB_CLIENT_ID not configured');
    const params = new URLSearchParams({
      client_id: process.env.QB_CLIENT_ID,
      scope: 'com.intuit.quickbooks.accounting',
      redirect_uri: process.env.QB_REDIRECT_URI ?? 'http://localhost:3001/api/quickbooks/callback',
      response_type: 'code',
      state: 'des-boms',
    });
    return `https://appcenter.intuit.com/connect/oauth2?${params}`;
  }

  async handleCallback(code: string, realmId: string) {
    this.logger.log(`QB OAuth callback received for realm ${realmId}`);
    this.connected = true;
  }

  async syncCustomers() {
    if (!this.connected) return { synced: 0, message: 'QuickBooks not connected' };
    this.logger.log('Syncing customers with QuickBooks');
    return { synced: 0, message: 'Sync not yet implemented' };
  }

  @Cron('0 */6 * * *')
  async scheduledSync() {
    if (!this.connected) return;
    this.logger.log('Running scheduled QB sync');
    await this.syncCustomers();
  }
}
