import { ModelData } from './model.data.interface';
import { Tweet } from './tweet.interface';

export function tweetToModelData(tweets: Tweet[]): ModelData[] {
  return tweets.map((tweet) => {
    return {
      text: tweet.text,
      date: tweet.created_at
    };
  });
};