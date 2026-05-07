import { IsEnum, IsOptional, IsDateString, IsString } from 'class-validator';
import { BatchStatus, BatchPriority } from '@des-boms/shared';

export class UpdateBatchDto {
  @IsOptional() @IsEnum(BatchStatus) status?: BatchStatus;
  @IsOptional() @IsEnum(BatchPriority) priority?: BatchPriority;
  @IsOptional() @IsDateString() estimatedCompletion?: string;
  @IsOptional() @IsDateString() actualCompletion?: string;
  @IsOptional() @IsString() notes?: string;
}
