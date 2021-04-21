import { ModelData } from './model.data.interface';
import { Tweet } from './tweet.interface';

export function filterNonEnglish (tweets: Tweet[]): Tweet[] {
  return tweets.filter((tweet) => tweet.lang === 'en');
};

export function filterEmptyModelReturns (data: ModelData[]): ModelData[] {
  return data.filter((data) => data.sentiment !== 'invalid');
};

export function tweetToModelData (tweets: Tweet[]): ModelData[] {
  return tweets.map((tweet) => {
    return {
      text: tweet.text,
      date: tweet.created_at
    };
  });
};