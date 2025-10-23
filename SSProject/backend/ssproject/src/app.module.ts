import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. Carga el módulo de Configuración para leer .env
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigService esté disponible en toda la app
    }),

    // 2. Configura TypeOrmModule
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      inject: [ConfigService], // Inyecta ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Tipo de base de datos
        url: configService.get<string>('DATABASE_URL'), // Lee la URL desde .env
        // entities: [User, Role], // Lista tus entidades aquí cuando las crees
        synchronize: false, // ¡Importante! Usa migraciones en lugar de sincronización automática en desarrollo/producción
        autoLoadEntities: true, // Opcional: Carga entidades automáticamente si usas TypeOrmModule.forFeature
        logging: configService.get<string>('NODE_ENV') === 'development', // Loggea SQL solo en desarrollo
      }),
    }),

    // 3. (Más adelante) Importar módulos de tus entidades
    // TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
