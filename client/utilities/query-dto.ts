export interface QueryDTO {
  endpoint: string,
  search: string,
  overallSentiment: string,
  averageScore: number,
  timeSeries: [{
    date: string,
    score: number
  }]
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