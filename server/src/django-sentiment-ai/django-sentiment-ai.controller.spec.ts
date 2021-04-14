import { Test, TestingModule } from '@nestjs/testing';
import { DjangoSentimentAiController } from './django-sentiment-ai.controller';

describe('DjangoSentimentAiController', () => {
  let controller: DjangoSentimentAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DjangoSentimentAiController],
    }).compile();

    controller = module.get<DjangoSentimentAiController>(DjangoSentimentAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
