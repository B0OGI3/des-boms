import { IsString, IsInt, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { BatchPriority } from '@des-boms/shared';

export class CreateBatchDto {
  @IsString() lineItemId: string;
  @IsInt() quantity: number;
  @IsOptional() @IsEnum(BatchPriority) priority?: BatchPriority;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() estimatedCompletion?: string;
  @IsOptional() @IsString() notes?: string;
}
