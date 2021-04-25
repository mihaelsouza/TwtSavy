export const ClientPayloadDummy = {
  overallSentiment: '',
  averageScore: -999,
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