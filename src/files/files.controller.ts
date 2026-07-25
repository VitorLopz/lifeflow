import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { FileMetasService } from './files.service';
import { CreateFileMetaDto } from './dto/create-file.dto';
import { UpdateFileMetaDto } from './dto/update-file.dto';

@UseGuards(JwtAuthGuard)
@Controller('files')
export class FileMetasController {
  constructor(private service: FileMetasService) {}

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.service.findAll(userId);
  }

  @Post()
  create(@CurrentUser('id') userId: string, @Body() dto: CreateFileMetaDto) {
    return this.service.create(userId, dto as any);
  }

  @Patch(':id')
  update(@CurrentUser('id') userId: string, @Param('id') id: string, @Body() dto: UpdateFileMetaDto) {
    return this.service.update(userId, id, dto as any);
  }

  @Delete(':id')
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.service.remove(userId, id);
  }
}
