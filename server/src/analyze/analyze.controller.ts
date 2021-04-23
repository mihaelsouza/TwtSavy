import { tweetToModelData, filterNonEnglish, filterEmptyModelReturns, generateClientPayload } from './utilities/utils';
import { ClientPayload } from './utilities/client.payload.interface';
import { ModelData } from './utilities/model.data.interface';
import { Tweet } from './utilities/tweet.interface';

import { TwitterApiService } from './services/twitter-api.service';
import { AnalyzeService } from './services/analyze.service';

import { Controller, Get, Param } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { UsersService } from 'src/users/services/users.service';

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

  private processingPipeline: Function = async (userId: number, input: string, endpoint: string) => {
    let callBack: Function, query: string | number;
    if (endpoint === 'hashtag') {
      query = input;
      callBack = this.twitterService.getHashtagQuery;
    } else {
      query = await this.getTwitterId(input);
      callBack = endpoint === 'timeline' ? this.twitterService.getUserTimeline : this.twitterService.getUserMentions;
    }

    // Check database for the search to avoid repeating searches unnecessarily
    const savedSearch = await this.usersService.retrieveSearch(userId, `${endpoint}&${input}`);
    if (savedSearch.overallSentiment !== 'dummy') {
      return savedSearch;
    } else {
      const tweets: Tweet[] = await this.getTweets(query, callBack);
      const data: ModelData[] = await this.getSentiment(tweets);
      const payload: ClientPayload = generateClientPayload(data);
      this.usersService.saveSearch(userId, `${endpoint}&${input}`, payload); // Save search to database under this user
      return payload;
    }
  };

  constructor (
    private aiService: AnalyzeService,
    private usersService: UsersService,
    private twitterService: TwitterApiService
  ) {}

  @Get('hashtag/:query/:id')
    async getHashtag(
      @Param('query') query: string, @Param('id') userId: number
    ): Promise<ClientPayload | string> {
      try {
        return await this.processingPipeline(userId, query, 'hashtag');
      } catch (err) {
        console.error('Analyze Controller > Hashtag Route -- ', err);
        return 'Insufficient data to provide an analysis. Try a different search!'
      }
    }

  @Get('timeline/:username/:id')
    async getTimeline(
      @Param('username') username: string, @Param('id') userId: number
    ): Promise<ClientPayload | string> {
      try {
        return await this.processingPipeline(userId, username, 'timeline');
      } catch (err) {
        console.error('Analyze Controller > Timeline Route -- ', err);
        return 'Insufficient data to provide an analysis. Try a different search!'
      }
    }

  @Get('mentions/:username/:id')
    async getMentions(
      @Param('username') username: string, @Param('id') userId: number
    ): Promise<ClientPayload | string> {
      try {
        return await this.processingPipeline(userId, username, 'mentions');
      } catch (err) {
        console.error('Analyze Controller > Mentions Route -- ', err);
        return 'Insufficient data to provide an analysis. Try a different search!'
      }
    }
}