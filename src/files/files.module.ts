import { Module } from '@nestjs/common';
import { FileMetasController } from './files.controller';
import { FileMetasService } from './files.service';
import { FilesUploadController } from './files-upload.controller';

@Module({
  controllers: [FileMetasController, FilesUploadController],
  providers: [FileMetasService],
  exports: [FileMetasService],
})
export class FileMetasModule {}
