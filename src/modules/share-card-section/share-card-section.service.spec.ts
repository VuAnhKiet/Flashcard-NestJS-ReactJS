import { Test, TestingModule } from '@nestjs/testing';
import { ShareCardSectionService } from './share-card-section.service';

describe('ShareCardSectionService', () => {
  let service: ShareCardSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareCardSectionService],
    }).compile();

    service = module.get<ShareCardSectionService>(ShareCardSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
