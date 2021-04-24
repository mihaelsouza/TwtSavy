import { filterNonEnglish, tweetToModelData } from '../utilities/utils';
import { ModelDataDTO } from '../utilities/model.data.interface';
import { TweetDTO } from '../utilities/tweet.interface';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class TwitterApiService {
  private tweetsEndpoint: string = 'https://api.twitter.com/2/tweets/search/recent?max_results=100';
  private usersEndpoint: string = 'https://api.twitter.com/2/users';
  private tweetFields: string = 'tweet.fields=created_at,lang,text';
  private config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  };

  constructor ( private http: HttpService ) {}

  async getTweets(search: string, endpoint: string): Promise<ModelDataDTO[]> {
    let callBack: Function, query: string | number;
    if (endpoint === 'hashtag') {
      query = search;
      callBack = this.getHashtagQuery;
    } else {
      query = await this.getTwitterId(search);
      callBack = endpoint === 'timeline' ? this.getUserTimeline : this.getUserMentions;
    }

    const tweets = await this.getTweetWithPagination(query, callBack)
    return tweetToModelData(tweets);
  };

  async getTweetWithPagination(search: string | number, func: Function): Promise<TweetDTO[]> {
    let twitterResponse: AxiosResponse = await func.call(this, search, '');
    let tweets: TweetDTO[] = filterNonEnglish(twitterResponse.data.data || []);
    if (tweets.length < 10) throw new Error('Insufficient number of tweets to analyze.');

    let count: number = 0;
    let page: string = twitterResponse.data.meta.next_token || '';
    while (page && count < 400) {
      twitterResponse = await func.call(this, search, page);
      tweets = tweets.concat(filterNonEnglish(twitterResponse.data.data));

      count += twitterResponse.data.meta.result_count
      page = twitterResponse.data.meta.next_token;
    }

    return tweets;
  }

  getHashtagQuery(query: string, page: string): Promise<AxiosResponse> {
    const fullQuery: string = `query=%23${query} lang:en -is:retweet has:hashtags`
    return page === '' ?
      this.http.get(`${this.tweetsEndpoint}&${this.tweetFields}&${fullQuery}`, this.config).toPromise()
    :
      this.http.get(`${this.tweetsEndpoint}&next_token=${page}&${this.tweetFields}&${fullQuery}`, this.config).toPromise();
  }

  async getTwitterId(username: string): Promise<number> {
    const response: AxiosResponse = await this.http.get(`${this.usersEndpoint}/by/username/${username}`, this.config).toPromise();
    return response.data.data.id;
  }

  getUserTimeline(id: number, page: string): Promise<AxiosResponse> {
    return page === '' ?
      this.http.get(`${this.usersEndpoint}/${id}/tweets?max_results=100&exclude=retweets,replies&${this.tweetFields}`, this.config).toPromise()
    :
      this.http.get(`${this.usersEndpoint}/${id}/tweets?max_results=100&exclude=retweets,replies&pagination_token=${page}&${this.tweetFields}`, this.config).toPromise();
  }

  getUserMentions(id: number, page: string): Promise<AxiosResponse> {
    return page === '' ?
      this.http.get(`${this.usersEndpoint}/${id}/mentions?max_results=100&${this.tweetFields}`, this.config).toPromise()
    :
      this.http.get(`${this.usersEndpoint}/${id}/mentions?max_results=100&pagination_token=${page}&${this.tweetFields}`, this.config).toPromise();
  }
}