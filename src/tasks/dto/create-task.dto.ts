import { IsBoolean, IsDateString, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsIn(['alta','media','baixa'])
  priority?: string;

  @IsDateString()
  due: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @IsOptional()
  @IsString()
  projectId?: string | null;
}
