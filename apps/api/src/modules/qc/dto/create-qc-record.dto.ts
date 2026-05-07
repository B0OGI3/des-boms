import { IsString, IsEnum, IsOptional } from 'class-validator';
import { QCResult } from '@des-boms/shared';

export class CreateQcRecordDto {
  @IsString() inspector: string;
  @IsEnum(QCResult) result: QCResult;
  @IsOptional() @IsString() notes?: string;
}
