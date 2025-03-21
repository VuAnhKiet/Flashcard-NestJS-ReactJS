import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/entities/card.entity';
import { GroupCard } from 'src/entities/group-card.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Card,GroupCard])],
  providers: [CardService],
  controllers: [CardController]
})
export class CardModule {}
