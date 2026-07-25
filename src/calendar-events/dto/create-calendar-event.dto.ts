import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCalendarEventDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsDateString()
  date: string;

  @IsOptional() @IsIn(['tarefa', 'habito', 'treino', 'evento'])
  category?: string;

  @IsOptional() @IsString()
  notes?: string;
}
