import { Injectable, HttpService } from '@nestjs/common';
import { Tweet } from '../utilities/tweet.interface';
import { AxiosResponse } from 'axios';

@Injectable()
export class TwitterApiService {
  private tweetsEndpoint: string = 'https://api.twitter.com/2/tweets/search/recent?max_results=100';
  private usersEndpoint: string = 'https://api.twitter.com/2/users';
  private tweetFields: string = 'tweet.fields=created_at,lang,text';
  private config = {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  };

  constructor ( private http: HttpService ) {}

  getHashtagQuery(query: string): Promise<AxiosResponse> {
    const fullQuery: string = `query=%23${query} lang:en -is:retweet has:hashtags`
    return this.http.get(`${this.tweetsEndpoint}&${this.tweetFields}&${fullQuery}`, this.config).toPromise();
  }

  getUserID(username: string): Promise<AxiosResponse> {
    return this.http.get(`${this.usersEndpoint}/by/username/${username}`, this.config).toPromise();
  }

  getUserTimeline(id: number): Promise<AxiosResponse> {
    return this.http.get(`${this.usersEndpoint}/${id}/tweets?max_results=100&${this.tweetFields}`, this.config).toPromise();
  }
}