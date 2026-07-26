import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateBookDto {
  @IsOptional() @IsString()
  title?: string;

  @IsOptional() @IsString()
  author?: string;

  @IsOptional() @IsInt() @Min(0) @Max(100)
  progress?: number;

  @IsOptional() @IsInt() @Min(0) @Max(5)
  rating?: number;

  @IsOptional() @IsInt() @Min(0)
  totalPages?: number;

  @IsOptional() @IsInt() @Min(0)
  currentPage?: number;

  @IsOptional() @IsString()
  coverUrl?: string;
}
