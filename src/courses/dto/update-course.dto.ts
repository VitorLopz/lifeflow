import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional() @IsString()
  title?: string;

  @IsOptional() @IsString()
  platform?: string;

  @IsOptional() @IsInt() @Min(0) @Max(100)
  progress?: number;

  @IsOptional() @IsInt() @Min(0)
  totalLessons?: number;

  @IsOptional() @IsInt() @Min(0)
  currentLesson?: number;
}
