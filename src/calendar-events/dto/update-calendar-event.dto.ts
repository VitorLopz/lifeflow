import { IsIn, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCalendarEventDto {
  @IsOptional() @IsString()
  title?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @IsOptional() @IsIn(['tarefa', 'habito', 'treino', 'evento'])
  category?: string;

  @IsOptional() @IsString()
  notes?: string;
}