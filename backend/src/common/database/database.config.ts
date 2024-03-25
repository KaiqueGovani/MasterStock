import { ConfigService } from '@nestjs/config';

export default class DatabaseConfig {
  static getMongoConfig(configService: ConfigService) {
    const user = configService.get<string>('MONGO_ROOT_USER');
    const password = configService.get<string>('MONGO_ROOT_PASSWORD');
    return `mongodb://${user}:${password}@mongo/MasterStock?authSource=admin`;
  }
}