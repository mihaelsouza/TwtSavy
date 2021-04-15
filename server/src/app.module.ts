import { AnalyzeModule } from './analyze/analyze.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.NEST_MONGO_HOST}:${process.env.NEST_MONGO_PORT}/${process.env.NEST_MONGO_DB}`),
    AnalyzeModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
