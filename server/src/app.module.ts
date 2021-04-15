import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyzeModule } from './analyze/analyze.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AnalyzeModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
