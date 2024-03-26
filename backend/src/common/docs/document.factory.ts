import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class DocumentFactory {
  static create(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.getDocumentConfig());
    SwaggerModule.setup('docs', app, document);
  }

  private static getDocumentConfig() {
    return new DocumentBuilder()
      .addBearerAuth()
      .setTitle('MasterStock API')
      .setDescription('The MasterStock API reference documentation')
      .setVersion('1.0')
      .build();
  }
}
