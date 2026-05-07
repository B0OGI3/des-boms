import { IsString, IsOptional, IsNumber } from 'class-validator';

export class AddComponentDto {
  @IsString() childPartId: string;
  @IsNumber() quantity: number;
  @IsOptional() @IsString() unitOfMeasure?: string;
  @IsOptional() @IsNumber() scrapFactor?: number;
  @IsOptional() @IsString() operation?: string;
  @IsOptional() @IsString() notes?: string;
}
