import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRunDto {
  @IsNumber()
  distance: number;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsDateString()
  date: string;
}
