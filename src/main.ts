import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  // create an app instance with CORS enabled
  const app = await NestFactory.create(AppModule, { cors: true });

  // helmet security-related HTTP headers
  app.use(helmet());

  // define a global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);

  // Cross-Site Request Forgery (CSRF) protection against unauthorized access
  app.use(csurf());
}
bootstrap();
