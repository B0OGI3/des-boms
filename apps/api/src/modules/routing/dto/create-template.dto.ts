import { IsString, IsOptional, IsArray, ValidateNested, IsInt, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class TemplateStepDto {
  @IsInt() stepNumber: number;
  @IsString() workstationId: string;
  @IsString() description: string;
  @IsOptional() @IsInt() estimatedTime?: number;
  @IsOptional() @IsBoolean() required?: boolean;
  @IsOptional() @IsString() notes?: string;
}

export class CreateTemplateDto {
  @IsString() name: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => TemplateStepDto)
  steps?: TemplateStepDto[];
}
