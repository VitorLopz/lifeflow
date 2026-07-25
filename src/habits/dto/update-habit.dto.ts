import { IsOptional, IsString } from 'class-validator';

export class UpdateHabitDto {
  @IsOptional() @IsString()
  name?: string;

  @IsOptional() @IsString()
  icon?: string;
}
