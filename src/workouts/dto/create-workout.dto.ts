import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkoutDto {
  @IsString() @IsNotEmpty()
  title!: string;

  @Type(() => Date)
  @IsDate()
  date!: Date;

  @IsOptional() @IsString()
  notes?: string;

  @IsOptional() @IsString()
  mainLift?: string;

  @IsOptional() @IsNumber()
  mainLiftWeight?: number;
}
