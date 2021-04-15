import { tweetToModelData, filterNonEnglish } from './utilities/utils';
import { TwitterApiService } from './services/twitter-api.service';
import { AnalyzeService } from './services/analyze.service';
import { ModelData } from './utilities/model.data.interface';
import { Tweet } from './utilities/tweet.interface';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('analyze')
export class AnalyzeController {
  private tweets: Tweet[] = [];

  constructor (
    private aiService: AnalyzeService,
    private twitterService: TwitterApiService
  ) {}

  @Get('hashtag/:query')
    async getHashtag(@Param('query') query: string): Promise<ModelData[]> {
      let twitterResponse = await this.twitterService.getHashtagQuery(query, '');
      this.tweets = twitterResponse.data.data;

      let page: string = twitterResponse.data.meta.next_token || '';
      if (page !== '') {
        let count = 0;
        while (page && count < 400) {
          twitterResponse = await this.twitterService.getHashtagQuery(query, page);
          this.tweets = this.tweets.concat(twitterResponse.data.data);

          count += twitterResponse.data.meta.result_count
          page = twitterResponse.data.meta.next_token;
          console.log(count, page, this.tweets.length)
        }
      }

      const modelResponse = await this.aiService.getSentiment(tweetToModelData(this.tweets));
      return modelResponse.data;
    }

  @Get('timeline/:username')
    async getTimeline(@Param('username') username: string): Promise<ModelData[]> {
      let twitterResponse = await this.twitterService.getUserID(username);
      const userID = twitterResponse.data.data.id;

      twitterResponse = await this.twitterService.getUserTimeline(userID, '');
      this.tweets = filterNonEnglish(twitterResponse.data.data);

      let page: string = twitterResponse.data.meta.next_token || '';
      if (page !== '') {
        let count = 0;
        while (page && count < 400) {
          twitterResponse = await this.twitterService.getUserTimeline(userID, page);
          this.tweets = this.tweets.concat(filterNonEnglish(twitterResponse.data.data));

          count += twitterResponse.data.meta.result_count
          page = twitterResponse.data.meta.next_token;
          console.log(count, page, this.tweets.length)
        }
      }

      const modelResponse = await this.aiService.getSentiment(tweetToModelData(this.tweets));
      return modelResponse.data;
    }

  @Get('mentions/:username')
    async getMentions(@Param('username') username: string): Promise<ModelData[]> {
      let twitterResponse = await this.twitterService.getUserID(username);
      const userID = twitterResponse.data.data.id;

      twitterResponse = await this.twitterService.getUserMentions(userID, '');
      this.tweets = filterNonEnglish(twitterResponse.data.data);

      let page: string = twitterResponse.data.meta.next_token || '';
      if (page !== '') {
        let count = 0;
        while (page && count < 400) {
          twitterResponse = await this.twitterService.getUserMentions(userID, page);
          this.tweets = this.tweets.concat(filterNonEnglish(twitterResponse.data.data));

          count += twitterResponse.data.meta.result_count
          page = twitterResponse.data.meta.next_token;
          console.log(count, page, this.tweets.length)
        }
      }

      const modelResponse = await this.aiService.getSentiment(tweetToModelData(this.tweets));
      return modelResponse.data;
    }
}