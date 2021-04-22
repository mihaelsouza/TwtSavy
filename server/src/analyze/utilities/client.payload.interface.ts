interface DataPoint {
  date: string,
  score: number
};

export interface ClientPayload {
  overallSentiment: string,
  averageScore: number,
  timeSeries: DataPoint[]
};