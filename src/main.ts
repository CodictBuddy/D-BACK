import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // app.setGlobalPrefix(process.env.API_PREFIX);
  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix(process.env.API_PREFIX);

  app.use('/images', express.static(join(__dirname, '..', 'images')));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Application API Documentation')
    .setDescription('post and put request on file upload')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, doc);

  await app.listen(port || 3000).then(() => {
    console.log(`====>App started in port ${port}<====`);
  });
}
bootstrap();
