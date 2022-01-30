import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as nunjucks from 'nunjucks';
import * as session from 'express-session';
import flash = require('req-flash');
import * as passport from 'passport';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { CsrfTokenInterceptor } from './module/auth/interceptor/csrf-token.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );

  const express = app.getHttpAdapter().getInstance();
  const njkEnv = nunjucks.configure(
    join(__dirname, '..', 'views'),
    { express: express, watch: process.env.APP_ENV != 'production' }
  );
  njkEnv.addGlobal('route', (path) => process.env.APP_URL + path);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('njk');

  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new CsrfTokenInterceptor());

  await app.listen(3000);
}
bootstrap();
