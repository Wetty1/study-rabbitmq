import { Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.listen(3000);
}

bootstrap();
