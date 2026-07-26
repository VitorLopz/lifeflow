import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateWorkoutDto {
  @IsOptional() @IsString()
  title?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @IsOptional() @IsString()
  notes?: string;

  @IsOptional() @IsString()
  mainLift?: string;

  @IsOptional() @IsNumber()
  mainLiftWeight?: number;
}
