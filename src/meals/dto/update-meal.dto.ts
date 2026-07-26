import { IsInt, IsNotEmpty, IsOptional, IsString, Min, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMealDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  calories?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;
}
