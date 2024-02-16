import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.SERVICE_HOST || '0.0.0.0',
        port: parseInt(process.env.SERVICE_PORT || '3001', 10),
      },
    },
  );

  app.useLogger(app.get(Logger));

  await app.listen();
}

bootstrap();
