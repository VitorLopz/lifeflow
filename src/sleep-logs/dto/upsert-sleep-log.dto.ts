import { IsDateString, IsInt, IsNumber, Max, Min } from 'class-validator';

export class UpsertSleepLogDto {
  @IsDateString()
  date: string;

  @IsNumber()
  hours: number;

  @IsInt() @Min(1) @Max(5)
  quality: number;
}
