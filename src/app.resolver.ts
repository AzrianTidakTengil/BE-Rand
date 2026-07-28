import { Resolver, Mutation } from '@nestjs/graphql';
import { AppService } from './app.service';

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
}
