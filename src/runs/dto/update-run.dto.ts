import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRunDto {
  @IsOptional()
  @IsNumber()
  distance?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  time?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;
}
