import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsOptional() @IsString()
  category?: string;

  @IsOptional() @IsString()
  period?: string;

  @IsNumber()
  target: number;

  @IsOptional() @IsNumber()
  current?: number;

  @IsOptional() @IsString()
  unit?: string;

  @IsOptional() @IsNumber()
  step?: number;

  @IsOptional() @IsString()
  habitId?: string | null;
}
