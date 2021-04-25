import { ClientPayloadDTO } from './client.payload-dto';
import { ModelDataDTO } from './model.data-dto';
import { TweetDTO } from './tweet-dto';

export function filterNonEnglish (tweets: TweetDTO[]): TweetDTO[] {
  return tweets.filter((tweet) => tweet.lang === 'en');
};

export function filterEmptyModelReturns (data: ModelDataDTO[]): ModelDataDTO[] {
  return data.filter((data) => data.sentiment !== 'invalid');
};

export function tweetToModelData (tweets: TweetDTO[]): ModelDataDTO[] {
  return tweets.map((tweet) => {
    return {
      text: tweet.text,
      date: tweet.created_at
    };
  });
};

export function generateClientPayload (data: ModelDataDTO[]): ClientPayloadDTO {
  const payload: ClientPayloadDTO = {overallSentiment: '', averageScore: 0, timeSeries: []};

  // Create the timeSeries array
  data.forEach((value) => {
    payload.timeSeries = [...payload.timeSeries, {date: value.date, score: value.score}]
  })

  // Calculate the overall sentiment
  payload.averageScore = Math.round(payload.timeSeries.reduce((acc, current) => {
    return {date: current.date, score: acc.score + current.score}
  }).score / payload.timeSeries.length * 100);

  if (payload.averageScore >= 70) payload.overallSentiment = 'positive';
  else if (payload.averageScore <= 30) payload.overallSentiment = 'negative';
  else payload.overallSentiment = 'neutral';

  return payload;
}