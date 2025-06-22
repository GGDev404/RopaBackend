import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Permite usar la URL completa si está presente
      ...(process.env.DB_HOST?.startsWith('postgres://') || process.env.DB_HOST?.startsWith('postgresql://')
        ? { url: process.env.DB_HOST }
        : {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
          }),
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false }, // <--- Esto es lo importante para Render
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
