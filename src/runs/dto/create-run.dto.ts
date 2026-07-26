import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRunDto {
  @IsNumber()
  distance!: number;

  @IsString()
  @IsNotEmpty()
  time!: string;

  @Type(() => Date)
  @IsDate()
  date!: Date;
}
