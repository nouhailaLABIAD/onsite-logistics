// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ IMPORTANT: global pipes AVANT listen
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // supprime les champs inconnus
      forbidNonWhitelisted: true, // erreur si champs inconnus
      transform: true, // transforme les types automatiquement
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();