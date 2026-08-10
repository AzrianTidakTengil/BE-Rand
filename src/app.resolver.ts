import { Resolver, Mutation, Query } from '@nestjs/graphql';
import { AppService } from './app.service';
import { ScheduleResponse } from './dto/schedule-response';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  // Mutation ini mengembalikan nilai Boolean (true jika berhasil)
  @Mutation(() => Boolean, { name: 'generateScheduleToday' })
  async generateScheduleToday(): Promise<boolean> {
    try {
      await this.appService.generateRandomDailySchedule();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Query(() => ScheduleResponse, { name: 'getScheduleForToday' })
  async getScheduleForToday(): Promise<ScheduleResponse | boolean> {
    try {
      await this.appService.generateRandomDailySchedule();
      return this.appService.getScheduleForToday();
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
