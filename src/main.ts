import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import {
  MongoExceptionFilter,
  ValidationErrorFilter,
} from './common/exceptions/MongoException';

async function bootstrap() {
  console.log(`Running Env: ${process.env.NODE_ENV}`);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalFilters(new ValidationErrorFilter());
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
