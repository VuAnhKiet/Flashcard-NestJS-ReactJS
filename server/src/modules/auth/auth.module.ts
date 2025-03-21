import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { MailService } from './mail/mail.service';
import { Token } from 'src/entities/token.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token]),
    JwtModule.register({
      global:true,
    }),
    ConfigModule,
    UserModule
  ],
  providers: [AuthService, MailService],
  controllers: [AuthController]

})
export class AuthModule { }
