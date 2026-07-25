import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'A senha precisa ter pelo menos 8 caracteres' })
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}
