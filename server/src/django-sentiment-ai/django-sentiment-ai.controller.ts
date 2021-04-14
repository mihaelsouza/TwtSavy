import { DjangoSentimentAiService } from './services/django-sentiment-ai.service';
import { ModelData } from './utilities/model.data.interface';
import { Tweet } from './utilities/tweet.interface';
import { Controller, Post, Get } from '@nestjs/common';

@Controller('analyze')
export class DjangoSentimentAiController {
  constructor ( private aiService: DjangoSentimentAiService ) {}

  @Get('hashtag')
    getSentiment(): void {
      const tweets: Tweet[] = [
        {
          lang: "en",
          id: 1382260742473330692,
          created_at: "2021-04-14T09:13:36.000Z",
          text: "😍❤️Babes! 🔥❤️Lets make looveee🥰 NEW SONG RELEASES in 1 hour!! 👉https://t.co/QsDlR60w7M\n#ESPNPlus\n#DynamiteTo1B\n#WomenFantasizeAbout\n#Newmusic\n#Wednesday\nBad Bunny \n#WrestleMania37 \nTaylor Swift\n#MrPerfectlyFine\nJustin Bieber Peaches \n#TaylorSwift \n#music #edm #rap #dj #djs https://t.co/evr5CpUQ1y"
        },
        {
          lang: "en",
          id: 1382235249791303682,
          created_at: "2021-04-14T07:32:18.000Z",
          text: "I vote #Dynamite for #BestMusicVideo on #iHeartAwards @BTS_twt \n#DynamiteTo1B #Dynamite1B \nBTS 💜😘"
        },
        {
          lang: "en",
          id: 1382232314076409859,
          created_at: "2021-04-14T07:20:38.000Z",
          text: "@TinyTANofficial @BTS_jp_official @BTS_twt #Dynamite #Dynamite1B\n#DynamiteTo1B \nl love you so much #Namjoon 💜\nl MİSS YOU 😭 https://t.co/dtp4KhHbVU"
        }
      ]

      const inputText: ModelData[] = tweets.map((tweet) => { return {text: tweet.text}; });
      this.aiService.getSentiment(inputText).subscribe((next) => {
        console.log(next);
      });
    }
}