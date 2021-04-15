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

  getHashtagQuery(query: string, page: string): Promise<AxiosResponse> {
    const fullQuery: string = `query=%23${query} lang:en -is:retweet has:hashtags`
    return page === '' ?
      this.http.get(`${this.tweetsEndpoint}&${this.tweetFields}&${fullQuery}`, this.config).toPromise()
    :
      this.http.get(`${this.tweetsEndpoint}&next_token=${page}&${this.tweetFields}&${fullQuery}`, this.config).toPromise();
  }

  getUserID(username: string): Promise<AxiosResponse> {
    return this.http.get(`${this.usersEndpoint}/by/username/${username}`, this.config).toPromise();
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