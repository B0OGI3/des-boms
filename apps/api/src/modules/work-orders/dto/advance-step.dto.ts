import { IsString, IsOptional, IsInt } from 'class-validator';

export class AdvanceStepDto {
  @IsOptional() @IsString() operatorId?: string;
  @IsOptional() @IsInt() actualTime?: number;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsString() photoUrl?: string;
}
