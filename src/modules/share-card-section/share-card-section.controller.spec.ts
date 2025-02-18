import { Test, TestingModule } from '@nestjs/testing';
import { ShareCardSectionController } from './share-card-section.controller';

describe('ShareCardSectionController', () => {
  let controller: ShareCardSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareCardSectionController],
    }).compile();

    controller = module.get<ShareCardSectionController>(ShareCardSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
