import { TwitterApiService } from './services/twitter-api.service';
import { AnalyzeService } from './services/analyze.service';
import { tweetToModelData } from './utilities/utils';
import { ModelData } from './utilities/model.data.interface';
import { Tweet } from './utilities/tweet.interface';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('analyze')
export class AnalyzeController {
  constructor (
    private aiService: AnalyzeService,
    private twitterService: TwitterApiService
  ) {}

  @Get('hashtag/:query')
    async getHashtag(@Param('query') query: string): Promise<ModelData[]> {
      const twitterResponse = await this.twitterService.getHashtagQuery(query);
      const tweets: Tweet[] = twitterResponse.data.data;

      const modelResponse = await this.aiService.getSentiment(tweetToModelData(tweets));
      return modelResponse.data;
    }

  @Get('timeline/:username')
    async getTimeline(@Param('username') username: string): Promise<ModelData[]> {
      let twitterResponse = await this.twitterService.getUserID(username);
      const userID = twitterResponse.data.data.id;

      twitterResponse = await this.twitterService.getUserTimeline(userID);
      const tweets: Tweet[] = twitterResponse.data.data;

      const modelResponse = await this.aiService.getSentiment(tweetToModelData(tweets));
      return modelResponse.data;
    }

  @Get('mentions/:username')
    async getMentions(@Param('username') username: string): Promise<ModelData[]> {
      let twitterResponse = await this.twitterService.getUserID(username);
      const userID = twitterResponse.data.data.id;

      twitterResponse = await this.twitterService.getUserMentions(userID);
      const tweets: Tweet[] = twitterResponse.data.data;

      const modelResponse = await this.aiService.getSentiment(tweetToModelData(tweets));
      return modelResponse.data;
    }
}