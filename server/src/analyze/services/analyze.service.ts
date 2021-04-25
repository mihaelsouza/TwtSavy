import { Injectable, HttpService, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { filterEmptyModelReturns, generateClientPayload } from '../utilities/utils';
import { ClientPayloadDTO } from '../utilities/client.payload-dto';
import { ModelDataDTO } from '../utilities/model.data-dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class AnalyzeService {
  private djangoServer: string = `${process.env.DJANGO_HOST}:${process.env.DJANGO_PORT}/api/v1`;

  constructor ( private http: HttpService ) {}

  async getSentiment(inputArray: ModelDataDTO[]): Promise<ClientPayloadDTO> {
    try {
      const response: AxiosResponse = await this.http.post(`${this.djangoServer}/predict`, inputArray).toPromise();
      const modelData: ModelDataDTO[] = filterEmptyModelReturns(response.data);
      if (modelData.length < 10) throw new BadRequestException('Insufficient number of valid tweets after processing.');
      else return generateClientPayload(modelData);
    } catch (err) {
      throw err.response.status === 400 ?
        new BadRequestException('Insufficient number of valid tweets after processing.') :
        new InternalServerErrorException('Internal Server Error when communicating with the AI.');
    }
  }
}