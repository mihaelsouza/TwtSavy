import { ModelData } from '../utilities/model.data.interface';
import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class AnalyzeService {
  private djangoServer: string = `${process.env.DJANGO_HOST}:${process.env.DJANGO_PORT}/api/v1`;

  constructor ( private httpService: HttpService ) {}

  getSentiment(inputText: ModelData[]): Promise<AxiosResponse<ModelData[]>> {
    return this.httpService.post(`${this.djangoServer}/predict`, inputText).toPromise();
  }
}