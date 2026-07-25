import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpsertWeightLogDto {
  @IsDateString()
  date: string;

  @IsNumber()
  kg: number;

  @IsOptional() @IsNumber()
  bodyFat?: number;
}
