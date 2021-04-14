import { ModelData } from '../utilities/model.data.interface';
import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class DjangoSentimentAiService {
  private djangoServer: string = `${process.env.DJANGO_HOST}:${process.env.DJANGO_PORT}/api/v1`;

  constructor ( private httpService: HttpService ) {}

  getSentiment(inputText: ModelData[]): Observable<AxiosResponse<ModelData[]>> {
    return this.httpService.post(`${this.djangoServer}/predict`, inputText);
  }
}