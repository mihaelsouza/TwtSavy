import { HttpModule, Module } from '@nestjs/common';
import { DjangoSentimentAiController } from './django-sentiment-ai.controller';
import { DjangoSentimentAiService } from './services/django-sentiment-ai.service';

@Module({
  imports: [HttpModule],
  controllers: [DjangoSentimentAiController],
  providers: [DjangoSentimentAiService],
})
export class DjangoSentimentAiModule {}
