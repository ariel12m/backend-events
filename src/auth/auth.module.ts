import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'SECRET_KEY',
    signOptions: {expiresIn: '1h'}
  })],
  providers: [AuthService, JwtStrategy, PrismaService, UserService],
  controllers: [AuthController]
})
export class AuthModule {}