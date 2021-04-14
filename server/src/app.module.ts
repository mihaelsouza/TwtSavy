import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DjangoSentimentAiModule } from './django-sentiment-ai/django-sentiment-ai.module';

@Module({
  imports: [DjangoSentimentAiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
