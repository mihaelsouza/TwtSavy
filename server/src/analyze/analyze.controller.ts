import { tweetToModelData, filterNonEnglish } from './utilities/utils';
import { ModelData } from './utilities/model.data.interface';
import { Tweet } from './utilities/tweet.interface';

import { TwitterApiService } from './services/twitter-api.service';
import { AnalyzeService } from './services/analyze.service';

import { Controller, Get, Param } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Controller('analyze')
export class AnalyzeController {
  private tweets: Tweet[] = [];

  private getTweets: Function = async(search: string | number, func: Function): Promise<void> => {
    let twitterResponse: AxiosResponse = await func.call(this.twitterService, search, '');
    this.tweets = filterNonEnglish(twitterResponse.data.data);

    let count: number = 0;
    let page: string = twitterResponse.data.meta.next_token || '';
    while (page && count < 400) {
      twitterResponse = await func.call(this.twitterService, search, page);
      this.tweets = this.tweets.concat(filterNonEnglish(twitterResponse.data.data));

      count += twitterResponse.data.meta.result_count
      page = twitterResponse.data.meta.next_token;
    }
  };

  constructor (
    private aiService: AnalyzeService,
    private twitterService: TwitterApiService
  ) {}

  @Get('hashtag/:query')
    async getHashtag(@Param('query') query: string): Promise<ModelData[]> {
      await this.getTweets(query, this.twitterService.getHashtagQuery);
      const modelResponse: AxiosResponse = await this.aiService.getSentiment(tweetToModelData(this.tweets));
      return modelResponse.data;
    }

  @Get('timeline/:username')
    async getTimeline(@Param('username') username: string): Promise<ModelData[]> {
      let twitterResponse: AxiosResponse = await this.twitterService.getUserID(username);
      const userID = twitterResponse.data.data.id;

      await this.getTweets(userID, this.twitterService.getUserTimeline);
      const modelResponse: AxiosResponse = await this.aiService.getSentiment(tweetToModelData(this.tweets));
      return modelResponse.data;
    }

  @Get('mentions/:username')
    async getMentions(@Param('username') username: string): Promise<ModelData[]> {
      let twitterResponse: AxiosResponse = await this.twitterService.getUserID(username);
      const userID = twitterResponse.data.data.id;

      await this.getTweets(userID, this.twitterService.getUserMentions);
      const modelResponse: AxiosResponse = await this.aiService.getSentiment(tweetToModelData(this.tweets));
      return modelResponse.data;
    }
}