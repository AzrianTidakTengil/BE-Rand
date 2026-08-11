import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './common/guard/api-key.guard';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'Hello';
  }

  @Post('scheduler/generate')
  @UseGuards(ApiKeyGuard)
  async generateSchedule(): Promise<any> {
    try {
      await this.appService.generateRandomDailySchedule();
      return this.appService.getScheduleForToday();
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
