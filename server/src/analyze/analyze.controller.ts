import { TwitterApiService } from './services/twitter-api.service';
import { AnalyzeService } from './services/analyze.service';
import { ModelData } from './utilities/model.data.interface';
import { Tweet } from './utilities/tweet.interface';
import { Controller, Post, Get } from '@nestjs/common';

@Controller('analyze')
export class AnalyzeController {
  constructor (
    private aiService: AnalyzeService,
    private twitterService: TwitterApiService
  ) {}

  @Get('hashtag')
    async getHashtag(): Promise<ModelData[]> {
      const twitterResponse = await this.twitterService.getHashtagQuery('DynamiteTo1B');
      const tweets: Tweet[] = twitterResponse.data.data;

      const inputText: ModelData[] = tweets.map((tweet) => {
        return {
          text: tweet.text,
          date: tweet.created_at
        };
      });

      const modelResponse = await this.aiService.getSentiment(inputText);
      return modelResponse.data;
    }

  @Get('timeline')
    async getTimeline(): Promise<ModelData[]> {
      let twitterResponse = await this.twitterService.getUserID('codeworks');
      const userID = twitterResponse.data.data.id;

      twitterResponse = await this.twitterService.getUserTimeline(userID);
      const tweets: Tweet[] = twitterResponse.data.data;

      const inputText: ModelData[] = tweets.map((tweet) => {
        return {
          text: tweet.text,
          date: tweet.created_at
        };
      });

      const modelResponse = await this.aiService.getSentiment(inputText);
      return modelResponse.data;
    }
}