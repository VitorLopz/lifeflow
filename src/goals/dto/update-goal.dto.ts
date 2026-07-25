import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGoalDto {
  @IsOptional() @IsString()
  title?: string;

  @IsOptional() @IsString()
  category?: string;

  @IsOptional() @IsString()
  period?: string;

  @IsOptional() @IsNumber()
  target?: number;

  @IsOptional() @IsNumber()
  current?: number;

  @IsOptional() @IsString()
  unit?: string;

  @IsOptional() @IsNumber()
  step?: number;

  @IsOptional() @IsString()
  habitId?: string | null;
}
