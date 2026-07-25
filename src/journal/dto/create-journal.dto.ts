import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJournalEntryDto {
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  mood?: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsArray()
  @IsString({
  each:
  true
  })
  tags?: string[];
}
