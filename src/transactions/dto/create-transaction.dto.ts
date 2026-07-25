import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsIn(['receita','despesa'])
  type: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;
}
