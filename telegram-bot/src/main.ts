import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowed headers
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Authorization',
    ],
    // headers exposed to the client
    exposedHeaders: ['Authorization'],
    credentials: true, // Enable credentials (cookies, authorization headers) cross-origin
  });
  await app.listen(4000);
}
bootstrap();
