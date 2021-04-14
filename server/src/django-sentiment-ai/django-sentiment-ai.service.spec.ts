import { Test, TestingModule } from '@nestjs/testing';
import { DjangoSentimentAiService } from './django-sentiment-ai.service';

describe('DjangoSentimentAiService', () => {
  let service: DjangoSentimentAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DjangoSentimentAiService],
    }).compile();

    service = module.get<DjangoSentimentAiService>(DjangoSentimentAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
