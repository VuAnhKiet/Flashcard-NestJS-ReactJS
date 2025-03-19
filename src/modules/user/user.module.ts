import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { FriendRequest } from 'src/entities/friend-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, FriendRequest])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
