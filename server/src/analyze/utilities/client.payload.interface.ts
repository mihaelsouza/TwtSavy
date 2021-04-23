interface DataPoint {
  date: string,
  score: number
};

export interface ClientPayload {
  overallSentiment: string,
  averageScore: number,
  timeSeries: DataPoint[]
};

export const ClientPayloadDummy = {
  overallSentiment: 'dummy',
  averageScore: 0,
  timeSeries: [{
    date: '',
    score: 0
  }]
};