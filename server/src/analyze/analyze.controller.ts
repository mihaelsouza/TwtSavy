import { Controller, Get, Param, ValidationPipe, UsePipes } from '@nestjs/common';
import { ClientPayloadDTO } from './utilities/client.payload-dto';
import { TwitterApiService } from './services/twitter-api.service';
import { UsersService } from 'src/users/services/users.service';
import { AnalyzeService } from './services/analyze.service';

@Controller('analyze')
export class AnalyzeController {
  constructor (
    private aiService: AnalyzeService,
    private usersService: UsersService,
    private twitterService: TwitterApiService
  ) {}

  async processingPipeline (userId: number, input: string, endpoint: string) {
    // Check database for the search to avoid repeating searches unnecessarily
    const savedSearch = await this.usersService.retrieveSearch(userId, `${endpoint}&${input}`);
    if (savedSearch.overallSentiment !== 'dummy') {
      return savedSearch;
    } else {
      const tweets = await this.twitterService.getTweets(input, endpoint);
      const payload = await this.aiService.getSentiment(tweets);
      this.usersService.saveSearch(userId, `${endpoint}&${input}`, payload); // Save search to database under this user
      return payload;
    }
  };

  @Get('hashtag/:query/:id')
  @UsePipes(ValidationPipe)
    async getHashtag(
      @Param('query') query: string, @Param('id') userId: number
    ): Promise<ClientPayloadDTO> {
      return await this.processingPipeline(userId, query, 'hashtag');
    }

  @Get('timeline/:username/:id')
    async getTimeline(
      @Param('username') username: string, @Param('id') userId: number
    ): Promise<ClientPayloadDTO> {
      return await this.processingPipeline(userId, username, 'timeline');
    }

  @Get('mentions/:username/:id')
    async getMentions(
      @Param('username') username: string, @Param('id') userId: number
    ): Promise<ClientPayloadDTO> {
      return await this.processingPipeline(userId, username, 'mentions');
    }
}