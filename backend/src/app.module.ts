import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { ProductsModule } from './api/products/products.module';
import { UsersModule } from './api/users/users.module';
import { QrcodeController } from './api/qrcode/qrcode.controller';
import { PaymentsModule } from './api/payments/payments.module';
import { DashboardModule } from './api/dashboard/dashboard.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PaymentsModule,
    DashboardModule,
  ],
  controllers: [AppController, QrcodeController],
  providers: [AppService],
})
export class AppModule {}
