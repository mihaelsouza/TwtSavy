import { ModelData } from '../utilities/model.data.interface';
import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class AnalyzeService {
  private djangoServer: string = `${process.env.DJANGO_HOST}:${process.env.DJANGO_PORT}/api/v1`;

  constructor ( private http: HttpService ) {}

  getSentiment(inputArray: ModelData[]): Promise<AxiosResponse> {
    return this.http.post(`${this.djangoServer}/predict`, inputArray).toPromise();
  }
}