import { Module } from '@nestjs/common';
import { DjangoSentimentAiController } from './django-sentiment-ai.controller';
import { DjangoSentimentAiService } from './django-sentiment-ai.service';

@Module({
  controllers: [DjangoSentimentAiController],
  providers: [DjangoSentimentAiService]
})
export class DjangoSentimentAiModule {}
