export interface QueryDTO {
  overallSentiment: string,
  averageScore: number,
  timeSeries: [{
    date: string,
    score: number
  }]
};

export const queryInitialState: QueryDTO = {
  overallSentiment: '',
  averageScore: 0,
  timeSeries: [{
    date: '',
    score: 0
  }]
};