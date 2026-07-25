import { IsDateString, IsInt, Max, Min } from 'class-validator';

export class UpsertWaterDto {
  @IsDateString()
  date: string;

  @IsInt() @Min(0) @Max(20)
  cups: number;
}
