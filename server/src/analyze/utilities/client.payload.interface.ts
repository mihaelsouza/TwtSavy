export const ClientPayloadDummy = {
  overallSentiment: 'dummy',
  averageScore: 0,
  timeSeries: [{
    date: '',
    score: 0
  }]
};

import { IsNotEmpty, IsString, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

interface DataPoint {
  date: string,
  score: number
};

export class ClientPayloadDTO {
  @IsNotEmpty()
  @IsString()
  overallSentiment: string;

  @IsNotEmpty()
  @IsNumber()
  averageScore: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  timeSeries: DataPoint[];
};