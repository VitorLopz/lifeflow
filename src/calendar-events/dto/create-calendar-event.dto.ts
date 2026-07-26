import { IsIn, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCalendarEventDto {
  @IsString() @IsNotEmpty()
  title!: string;

  @Type(() => Date)
  @IsDate()
  date!: Date;

  @IsOptional() @IsIn(['tarefa', 'habito', 'treino', 'evento'])
  category?: string;

  @IsOptional() @IsString()
  notes?: string;
}
