import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateCalendarEventDto {
  @IsOptional() @IsString()
  title?: string;

  @IsOptional() @IsDateString()
  date?: string;

  @IsOptional() @IsIn(['tarefa', 'habito', 'treino', 'evento'])
  category?: string;

  @IsOptional() @IsString()
  notes?: string;
}
