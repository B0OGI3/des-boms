import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ConfirmationStatus } from '@des-boms/shared';

export class ConfirmStepDto {
  @IsString() workstationId: string;
  @IsString() operatorName: string;
  @IsOptional() @IsString() operatorId?: string;
  @IsOptional() @IsDateString() startTime?: string;
  @IsOptional() @IsDateString() endTime?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsString() photoUrl?: string;
  @IsOptional() @IsEnum(ConfirmationStatus) status?: ConfirmationStatus;
}
