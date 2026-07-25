import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Remove campos que não existem no DTO e rejeita payloads com campos
  // inesperados — primeira linha de defesa contra dados malformados.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // Sem isso, campos numéricos/booleanos enviados por formulários HTML
      // (que sempre chegam como string, ex. "100") eram rejeitados pelos
      // decorators @IsNumber()/@IsInt()/@IsBoolean() dos DTOs — causando
      // falha ao criar transações, metas, refeições, registros de peso etc.
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim());

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  const port = process.env.PORT || 3333;
  await app.listen(port);
  console.log(`LifeFlow API rodando em http://localhost:${port}`);
}
bootstrap();
