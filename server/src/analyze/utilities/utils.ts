import { ClientPayload } from './client.payload.interface';
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

export function generateClientPayload (data: ModelData[]): ClientPayload {
  const payload: ClientPayload = {overallSentiment: '', timeSeries: []};

  // Create the timeSeries array
  data.forEach((value) => {
    payload.timeSeries = [...payload.timeSeries, {date: value.date, score: value.score}]
  })

  // Calculate the overall sentiment
  const averageScore: number = payload.timeSeries.reduce((acc, current) => {
    return {date: current.date, score: acc.score + current.score}
  }).score / payload.timeSeries.length;

  if (averageScore >= 0.7) payload.overallSentiment = 'positive';
  else if (averageScore <= 0.3) payload.overallSentiment = 'negative';
  else payload.overallSentiment = 'neutral';

  return payload;
}