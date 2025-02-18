import { Module } from '@nestjs/common';
import { GroupCardService } from './group-card.service';
import { GroupCardController } from './group-card.controller';

@Module({
  providers: [GroupCardService],
  controllers: [GroupCardController]
})
export class GroupCardModule {}
