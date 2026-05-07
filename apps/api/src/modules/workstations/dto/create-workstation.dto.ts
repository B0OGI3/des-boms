import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { WorkstationCategory } from '@des-boms/shared';

export class CreateWorkstationDto {
  @IsString() name: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsEnum(WorkstationCategory) category?: WorkstationCategory;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() serialNumber?: string;
  @IsOptional() @IsString() manufacturer?: string;
  @IsOptional() @IsString() model?: string;
}
