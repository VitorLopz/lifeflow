import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFileMetaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @IsString()
  size?: string;
}
