import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get('DB_PORT', 5432)),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_NAME', 'edu'),
        autoLoadEntities: true,
        // Auto-creates/alters tables from entities. On by default outside production;
        // DB_SYNCHRONIZE=true|false overrides. Use migrations for real production data.
        synchronize:
          config.get<string>('DB_SYNCHRONIZE') !== undefined
            ? config.get<string>('DB_SYNCHRONIZE') === 'true'
            : config.get('NODE_ENV') !== 'production',
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
