import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRunDto {
  @IsOptional()
  @IsNumber()
  distance?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  time?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
