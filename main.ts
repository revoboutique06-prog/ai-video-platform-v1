import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // تفعيل الجلسات
  app.use(
    session({
      secret: 'revoflow-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  // السماح للفرونت بالوصول
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(3000);
  console.log('🚀 RevoFlow Backend is running on http://localhost:3000');
}

bootstrap();
