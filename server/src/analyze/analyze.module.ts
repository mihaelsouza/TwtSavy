import { HttpModule, Module } from '@nestjs/common';
import { AnalyzeController } from './analyze.controller';
import { AnalyzeService } from './services/analyze.service';
import { TwitterApiService } from './services/twitter-api.service';

@Module({
  imports: [HttpModule],
  controllers: [AnalyzeController],
  providers: [AnalyzeService, TwitterApiService],
})
export class AnalyzeModule {}
