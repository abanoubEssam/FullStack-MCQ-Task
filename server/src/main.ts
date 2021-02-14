import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001
  await app.listen(port);
  logger.log(`Server listening on port ${port}`)
}
bootstrap();
