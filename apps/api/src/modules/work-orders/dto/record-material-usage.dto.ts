import { IsString, IsOptional, IsNumber } from 'class-validator';

export class RecordMaterialUsageDto {
  @IsString() materialPartId: string;
  @IsOptional() @IsString() routingStepId?: string;
  @IsNumber() quantityUsed: number;
  @IsOptional() @IsNumber() unitCost?: number;
  @IsOptional() @IsString() operatorId?: string;
  @IsOptional() @IsString() notes?: string;
}
