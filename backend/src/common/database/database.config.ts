import { ConfigService } from '@nestjs/config';

export default class DatabaseConfig {
  static getMongoConfig(configService: ConfigService): string {
    const url = configService.get<string>('MONGO_CLOUD_CLUSTER_DB_URL');
    return url;
  }
}
