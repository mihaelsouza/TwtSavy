import { Test, TestingModule } from '@nestjs/testing';
import { TwitterApiService } from './twitter-api.service';

describe('TwitterApiService', () => {
  let service: TwitterApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitterApiService],
    }).compile();

    service = module.get<TwitterApiService>(TwitterApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
