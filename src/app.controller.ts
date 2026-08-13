import { Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './common/guard/api-key.guard';

@Controller('api')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'Hello';
  }

  @Post('scheduler/generate')
  @UseGuards(ApiKeyGuard)
  async generateSchedule(): Promise<any> {
    try {
      this.logger.log('Memulai trigger pembuatan jadwal harian...');

      await this.appService.generateRandomDailySchedule();
      const schedule = await this.appService.getScheduleForToday();

      this.logger.log('Pembuatan jadwal harian berhasil diselesaikan.');

      return {
        success: true,
        data: schedule,
      };
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
