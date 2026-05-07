import { IsString, IsEnum, IsOptional } from 'class-validator';
import { QCResult } from '@des-boms/shared';

export class RecordQualityCheckDto {
  @IsOptional() @IsString() routingStepId?: string;
  @IsString() checkType: string;
  @IsEnum(QCResult) result: QCResult;
  @IsString() checkedBy: string;
  @IsOptional() measurements?: object;
  @IsOptional() @IsString() defects?: string;
  @IsOptional() @IsString() correctedBy?: string;
  @IsOptional() @IsString() notes?: string;
}
