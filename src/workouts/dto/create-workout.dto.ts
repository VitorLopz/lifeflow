import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsDateString()
  date: string;

  @IsOptional() @IsString()
  notes?: string;

  @IsOptional() @IsString()
  mainLift?: string;

  @IsOptional() @IsNumber()
  mainLiftWeight?: number;
}
