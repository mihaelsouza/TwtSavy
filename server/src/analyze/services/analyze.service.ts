import { Injectable, HttpService, InternalServerErrorException } from '@nestjs/common';
import { filterEmptyModelReturns, generateClientPayload } from '../utilities/utils';
import { ClientPayloadDTO } from '../utilities/client.payload.interface';
import { ModelDataDTO } from '../utilities/model.data.interface';
import { AxiosResponse } from 'axios';

@Injectable()
export class AnalyzeService {
  private djangoServer: string = `${process.env.DJANGO_HOST}:${process.env.DJANGO_PORT}/api/v1`;

  constructor ( private http: HttpService ) {}

  async getSentiment(inputArray: ModelDataDTO[]): Promise<ClientPayloadDTO> {
    try {
      const response: AxiosResponse = await this.http.post(`${this.djangoServer}/predict`, inputArray).toPromise();
      const modelData: ModelDataDTO[] = filterEmptyModelReturns(response.data);
      if (modelData.length < 10) throw new InternalServerErrorException('Insufficient number of valid tweets after processing.');
      else {
        return generateClientPayload(modelData);
      }
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Insufficient number of valid tweets after processing.');
    }
  }
}