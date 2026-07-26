import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  desc!: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsIn(['receita','despesa'])
  type!: string;

  @IsNumber()
  amount!: number;

  @Type(() => Date)
  @IsDate()
  date!: Date;
}
