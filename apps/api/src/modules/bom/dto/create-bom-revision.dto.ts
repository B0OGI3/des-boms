import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateBomRevisionDto {
  @IsString() partId: string;
  @IsString() revisionNumber: string;
  @IsOptional() @IsString() description?: string;
  @IsDateString() effectiveDate: string;
  @IsString() createdBy: string;
}
