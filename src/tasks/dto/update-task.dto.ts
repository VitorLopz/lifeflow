import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsIn(['alta','media','baixa'])
  priority?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  due?: Date;

  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @IsOptional()
  @IsString()
  projectId?: string | null;
}
