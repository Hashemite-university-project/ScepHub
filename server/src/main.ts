import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.ALLOWED_ORIGIN, credentials: true });
  app.use(cookieParser());
  app.use(
    ['/api', '/api-json'],
    basicAuth({
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
      challenge: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('ScepHub')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
