import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateHabitDto {
  @IsString() @IsNotEmpty()
  name: string;

  @IsOptional() @IsString()
  icon?: string;
}
