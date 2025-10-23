// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
// Importa tus servicios y controladores aquí

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  // providers: [AuthService, UsersService, ...],
  // controllers: [AuthController, UsersController, ...],
})
export class AuthModule {}
