import { IsInt, IsNotEmpty, IsString, Min, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  @Min(0)
  calories!: number;

  @Type(() => Date)
  @IsDate()
  date!: Date;
}
