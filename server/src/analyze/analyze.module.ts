import { TwitterApiService } from './services/twitter-api.service';
import { AnalyzeService } from './services/analyze.service';
import { AnalyzeController } from './analyze.controller';
import { UsersModule } from 'src/users/users.module';
import { HttpModule, Module } from '@nestjs/common';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [AnalyzeController],
  providers: [AnalyzeService, TwitterApiService],
})
export class AnalyzeModule {}
