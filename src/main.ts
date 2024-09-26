import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestMethod } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('McEasy Parts API')
    .setDescription('McEasy Parts API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document, {
    useGlobalPrefix: true,
  });

  const PORT = process.env.PORT || 3000;
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  await app.listen(PORT);
}
bootstrap();
