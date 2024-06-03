import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentFactory } from './common/docs/document.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Instantiate Swagger app
  DocumentFactory.create(app);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
