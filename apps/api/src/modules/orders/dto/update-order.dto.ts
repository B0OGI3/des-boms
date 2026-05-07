import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { OrderPriority, OrderStatus } from '@des-boms/shared';

export class UpdateOrderDto {
  @IsOptional() @IsString() poNumber?: string;
  @IsOptional() @IsDateString() dueDate?: string;
  @IsOptional() @IsEnum(OrderPriority) priority?: OrderPriority;
  @IsOptional() @IsEnum(OrderStatus) orderStatus?: OrderStatus;
  @IsOptional() @IsString() notes?: string;
}
