import { tweetToModelData, filterNonEnglish, filterEmptyModelReturns, generateClientPayload } from './utilities/utils';
import { ClientPayload } from './utilities/client.payload.interface';
import { ModelData } from './utilities/model.data.interface';
import { Tweet } from './utilities/tweet.interface';

import { TwitterApiService } from './services/twitter-api.service';
import { AnalyzeService } from './services/analyze.service';

import { Controller, Get, Param } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Controller('analyze')
export class AnalyzeController {
  private getTwitterId: Function = async (username: string): Promise<number> => {
    let twitterResponse: AxiosResponse = await this.twitterService.getUserID(username);
    return twitterResponse.data.data.id;
  }

  private getTweets: Function = async (search: string | number, func: Function): Promise<Tweet[]> => {
    let twitterResponse: AxiosResponse = await func.call(this.twitterService, search, '');
    let tweets: Tweet[] = filterNonEnglish(twitterResponse.data.data || []);
    if (tweets.length < 10) throw new Error('Insufficient number of tweets to analyze.');

    let count: number = 0;
    let page: string = twitterResponse.data.meta.next_token || '';
    while (page && count < 400) {
      twitterResponse = await func.call(this.twitterService, search, page);
      tweets = tweets.concat(filterNonEnglish(twitterResponse.data.data));

      count += twitterResponse.data.meta.result_count
      page = twitterResponse.data.meta.next_token;
    }

    return tweets;
  };

  private getSentiment: Function = async (tweets: Tweet[]): Promise<ModelData[]> => {
    const modelResponse: AxiosResponse = await this.aiService.getSentiment(tweetToModelData(tweets));
    const modelData: ModelData[] = filterEmptyModelReturns(modelResponse.data);
    if (modelData.length < 10) throw new Error('Insufficient number of valid tweets after processing.');
    else return modelData;
  };

  constructor (
    private aiService: AnalyzeService,
    private twitterService: TwitterApiService
  ) {}

  @Get('hashtag/:query')
    async getHashtag(@Param('query') query: string): Promise<ClientPayload | string> {
      try {
        const tweets: Tweet[] = await this.getTweets(query, this.twitterService.getHashtagQuery);
        const data: ModelData[] = await this.getSentiment(tweets);
        return generateClientPayload(data);
      } catch (err) {
        console.error('Analyze Controller > Hashtag Route -- ', err);
        return 'Insufficient data to provide an analysis. Try a different search!'
      }
    }

  @Get('timeline/:username')
    async getTimeline(@Param('username') username: string): Promise<ClientPayload | string> {
      try {
        const userID: number = await this.getTwitterId(username);
        const tweets: Tweet[] = await this.getTweets(userID, this.twitterService.getUserTimeline);
        const data: ModelData[] = await this.getSentiment(tweets);
        return generateClientPayload(data);
      } catch (err) {
        console.error('Analyze Controller > Timeline Route -- ', err);
        return 'Insufficient data to provide an analysis. Try a different search!'
      }
    }

  @Get('mentions/:username')
    async getMentions(@Param('username') username: string): Promise<ClientPayload | string> {
      try {
        const userID: number = await this.getTwitterId(username);
        const tweets: Tweet[] = await this.getTweets(userID, this.twitterService.getUserMentions);
        const data: ModelData[] = await this.getSentiment(tweets);
        return generateClientPayload(data);
      } catch (err) {
        console.error('Analyze Controller > Mentions Route -- ', err);
        return 'Insufficient data to provide an analysis. Try a different search!'
      }
    }
}