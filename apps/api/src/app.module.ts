import { join } from 'path';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './modules/customers/customers.module';
import { OrdersModule } from './modules/orders/orders.module';
import { BatchesModule } from './modules/batches/batches.module';
import { PartsModule } from './modules/parts/parts.module';
import { BomModule } from './modules/bom/bom.module';
import { WorkstationsModule } from './modules/workstations/workstations.module';
import { RoutingModule } from './modules/routing/routing.module';
import { QcModule } from './modules/qc/qc.module';
import { QuickbooksModule } from './modules/quickbooks/quickbooks.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { WorkOrdersModule } from './modules/work-orders/work-orders.module';
import { ManufacturingGateway } from './gateways/manufacturing.gateway';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    CustomersModule,
    OrdersModule,
    BatchesModule,
    PartsModule,
    BomModule,
    WorkstationsModule,
    RoutingModule,
    QcModule,
    QuickbooksModule,
    UploadsModule,
    WorkOrdersModule,
  ],
  providers: [ManufacturingGateway],
})
export class AppModule {}
