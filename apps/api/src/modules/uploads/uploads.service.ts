import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';

@Injectable()
export class UploadsService {
  constructor(private readonly prisma: PrismaService) {}

  findForLineItem(lineItemId: string) {
    return this.prisma.fileAttachment.findMany({
      where: { lineItemId },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(lineItemId: string, dto: CreateAttachmentDto) {
    return this.prisma.fileAttachment.create({
      data: {
        lineItemId,
        fileName: dto.fileName,
        storedFileName: dto.storedFileName,
        filePath: dto.filePath,
        fileType: dto.fileType,
        mimeType: dto.mimeType,
        fileSize: dto.fileSize,
        uploadedBy: dto.uploadedBy,
        description: dto.description,
      },
    });
  }

  async remove(id: string) {
    const attachment = await this.prisma.fileAttachment.findUnique({ where: { id } });
    if (!attachment) throw new NotFoundException(`Attachment ${id} not found`);
    return this.prisma.fileAttachment.delete({ where: { id } });
  }
}
