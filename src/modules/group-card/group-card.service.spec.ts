import { Test, TestingModule } from '@nestjs/testing';
import { GroupCardService } from './group-card.service';

describe('GroupCardService', () => {
  let service: GroupCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupCardService],
    }).compile();

    service = module.get<GroupCardService>(GroupCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
