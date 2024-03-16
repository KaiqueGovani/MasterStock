import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProductsModule, ConfigModule.forRoot({isGlobal: true}), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
