import { IsOptional, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class AskAssistantDto {
  @IsString() @IsNotEmpty() @MaxLength(2000)
  prompt: string;

  @IsOptional() @IsString() @MaxLength(4000)
  context?: string;
}
