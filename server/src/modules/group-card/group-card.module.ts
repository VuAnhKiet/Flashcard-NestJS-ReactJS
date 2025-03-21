import { Module } from '@nestjs/common';
import { GroupCardService } from './group-card.service';
import { GroupCardController } from './group-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Card } from 'src/entities/card.entity';
import { GroupCard } from 'src/entities/group-card.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Card,GroupCard])],
  providers: [GroupCardService],
  controllers: [GroupCardController]
})
export class GroupCardModule {}
