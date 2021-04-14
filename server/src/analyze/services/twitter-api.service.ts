import { Injectable, HttpService } from '@nestjs/common';
import { Tweet } from '../utilities/tweet.interface';
import { AxiosResponse } from 'axios';

@Injectable()
export class TwitterApiService {
  private tweetsEndpoint: string = 'https://api.twitter.com/2/tweets/search/recent?max_results=100';
  private usersEndpoint: string = 'https://api.twitter.com/2/users';
  private config = {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  };

  constructor ( private http: HttpService ) {}

  getHashtagQuery(query: string): Promise<AxiosResponse> {
    const fields: string = 'tweet.fields=created_at,lang,text'
    const fullQuery: string = `query=%23${query} lang:en -is:retweet has:hashtags`
    return this.http.get(`${this.tweetsEndpoint}&${fields}&${fullQuery}`, this.config).toPromise();
  }
}