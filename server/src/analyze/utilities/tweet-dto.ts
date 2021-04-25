import { IsNotEmpty, IsString, IsDate, IsInt } from 'class-validator';

export class TweetDTO {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  lang: string;

  @IsNotEmpty()
  @IsDate()
  created_at: string;

  @IsNotEmpty()
  @IsString()
  text: string;
};