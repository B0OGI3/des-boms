import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { PartType } from '@des-boms/shared';

export class UpdatePartDto {
  @IsOptional() @IsString() partName?: string;
  @IsOptional() @IsEnum(PartType) partType?: PartType;
  @IsOptional() @IsString() drawingNumber?: string;
  @IsOptional() @IsString() revisionLevel?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() materialSpec?: string;
  @IsOptional() @IsString() unitOfMeasure?: string;
  @IsOptional() @IsString() recommendedRoutingTemplateId?: string;
  @IsOptional() @IsBoolean() active?: boolean;
  @IsOptional() @IsString() notes?: string;
}
