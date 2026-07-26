import { IsArray, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJournalEntryDto {
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @IsOptional()
  @IsString()
  mood?: string;

  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsOptional()
  @IsArray()
  @IsString({
  each:
  true
  })
  tags?: string[];
}
