"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const admin = require("firebase-admin");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const port = process.env.PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(helmet());
    app.enableCors({ origin: '*' });
    app.use(cookieParser());
    app.use(mongoSanitize());
    app.use(xss());
    app.use(compression());
    app.setGlobalPrefix(process.env.API_PREFIX);
    const adminConfig = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };
    admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
    });
    app.use('/images', express.static(path_1.join(__dirname, '..', 'images')));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('post and put request on file upload')
        .setVersion('1.0')
        .build();
    const doc = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('', app, doc);
    await app.listen(process.env.PORT || 3000).then(() => {
        console.log(`====>App started in port ${port}<====`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map