import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // app.setGlobalPrefix(process.env.API_PREFIX);
  app.enableCors({
    origin: '*',
  });

  const options = new DocumentBuilder()
    .setTitle('API DOCUMENTATION')
    .setDescription('Swagger demo API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(port || 3000).then(() => {
    console.log(`====>App started in port ${port}<====`);
  });
}
bootstrap();
