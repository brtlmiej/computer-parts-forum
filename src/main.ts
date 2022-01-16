import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as nunjucks from 'nunjucks';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const express = app.getHttpAdapter().getInstance();
  const njkEnv = nunjucks.configure(
    join(__dirname, '..', 'views'),
    { express: express, watch: process.env.APP_ENV != 'production' }
  );
  njkEnv.addGlobal('route', (path) => process.env.APP_URL + path);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('njk');

  await app.listen(3000);
}
bootstrap();
