import { Module } from '@nestjs/common';
import { ShareCardSectionService } from './share-card-section.service';
import { ShareCardSectionController } from './share-card-section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareSection } from 'src/entities/share-section.entity';
import { User } from 'src/entities/user.entity';
import { Card } from 'src/entities/card.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ShareSection,User,Card])],
  providers: [ShareCardSectionService],
  controllers: [ShareCardSectionController]
})
export class ShareCardSectionModule {}
