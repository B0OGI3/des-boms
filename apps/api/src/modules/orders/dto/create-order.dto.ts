import { IsString, IsDateString, IsEnum, IsOptional, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderPriority } from '@des-boms/shared';

class CreateLineItemDto {
  @IsString() partId: string;
  @IsOptional() @IsString() bomRevisionId?: string;
  @IsInt() quantity: number;
  @IsOptional() unitPrice?: number;
  @IsOptional() @IsDateString() dueDate?: string;
  @IsOptional() @IsString() notes?: string;
}

export class CreateOrderDto {
  @IsString() customerId: string;
  @IsString() poNumber: string;
  @IsDateString() dueDate: string;
  @IsOptional() @IsEnum(OrderPriority) priority?: OrderPriority;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CreateLineItemDto)
  lineItems?: CreateLineItemDto[];
}
