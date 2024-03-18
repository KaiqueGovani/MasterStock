import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DocumentFactory } from './common/docs/document.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Instantiate Swagger app
  DocumentFactory.create(app);

  await app.listen(3000);
}
bootstrap();
