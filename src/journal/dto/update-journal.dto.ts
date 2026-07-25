import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateJournalEntryDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  mood?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  text?: string;

  @IsOptional()
  @IsArray()
  @IsString({
  each:
  true
  })
  tags?: string[];
}
