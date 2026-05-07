import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAttachmentDto {
  @IsString() fileName: string;
  @IsString() storedFileName: string;
  @IsString() filePath: string;
  @IsString() fileType: string;
  @IsString() mimeType: string;
  @IsInt() fileSize: number;
  @IsString() uploadedBy: string;
  @IsOptional() @IsString() description?: string;
}
