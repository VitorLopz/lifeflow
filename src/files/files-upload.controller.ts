import {
  Controller, Post, Get, Param, Delete, UseGuards, UseInterceptors,
  UploadedFile, Res, NotFoundException, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';

const UPLOAD_DIR = join(process.cwd(), 'uploads');
if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });

// Limite de 15MB por arquivo — ajuste conforme necessário.
const MAX_SIZE = 15 * 1024 * 1024;

@UseGuards(JwtAuthGuard)
@Controller('files')
export class FilesUploadController {
  constructor(private prisma: PrismaService) {}

  // Upload real (multipart/form-data, campo "file"), opcionalmente com
  // um campo de texto "project" para categorizar. Cria o registro no banco
  // e salva o binário em ./uploads — em produção, troque diskStorage por
  // um adapter de S3/R2 mantendo a mesma interface do controller.
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: MAX_SIZE },
    }),
  )
  async upload(
    @CurrentUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Nenhum arquivo enviado');

    const sizeLabel =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;

    return this.prisma.fileMeta.create({
      data: {
        userId,
        name: file.originalname,
        size: sizeLabel,
        path: file.filename,
        mimeType: file.mimetype,
      },
    });
  }

  @Get(':id/download')
  async download(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const meta = await this.prisma.fileMeta.findUnique({ where: { id } });
    if (!meta || meta.userId !== userId || !meta.path) {
      throw new NotFoundException('Arquivo não encontrado');
    }
    return res.download(join(UPLOAD_DIR, meta.path), meta.name);
  }
}
