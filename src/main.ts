import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as mongoSanitize from 'express-mongo-sanitize';
import * as xss from 'xss-clean';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());
  // app.use('*', cors());
  app.enableCors({ origin: '*' });
  app.use(cookieParser());

  app.use(mongoSanitize());

  app.use(xss());

  app.use(compression());
  app.setGlobalPrefix(process.env.API_PREFIX);

  // push notification firebase configuration
  const adminConfig: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  app.use('/images', express.static(join(__dirname, '..', 'images')));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('post and put request on file upload')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, doc);
  await app.listen(process.env.PORT || 3000).then(() => {
    console.log(`====>App started in port ${port}<====`);
  });
  // await app.listen(port);
}
bootstrap();
