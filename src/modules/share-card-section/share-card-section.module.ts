import { Module } from '@nestjs/common';
import { ShareCardSectionService } from './share-card-section.service';
import { ShareCardSectionController } from './share-card-section.controller';

@Module({
  providers: [ShareCardSectionService],
  controllers: [ShareCardSectionController]
})
export class ShareCardSectionModule {}
