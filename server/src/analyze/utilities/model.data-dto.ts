import { IsNotEmpty, IsOptional, IsDate, IsString, IsNumber } from 'class-validator';

export class ModelDataDTO {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsDate()
  date: string;

  @IsOptional()
  @IsString()
  sentiment?: string;

  @IsOptional()
  @IsNumber()
  score?: number;
};