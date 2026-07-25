import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateWorkoutDto {
  @IsOptional() @IsString()
  title?: string;

  @IsOptional() @IsDateString()
  date?: string;

  @IsOptional() @IsString()
  notes?: string;

  @IsOptional() @IsString()
  mainLift?: string;

  @IsOptional() @IsNumber()
  mainLiftWeight?: number;
}
