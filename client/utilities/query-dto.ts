export interface DataPoint {
  date: string,
  score: number
};

export interface QueryDTO {
  endpoint: string,
  search: string,
  overallSentiment: string,
  averageScore: number,
  timeSeries: DataPoint[]
};

export const queryInitialState: QueryDTO = {
  endpoint: 'hashtag',
  search: '',
  overallSentiment: '',
  averageScore: 0,
  timeSeries: [{
    date: '',
    score: 0
  }]
};