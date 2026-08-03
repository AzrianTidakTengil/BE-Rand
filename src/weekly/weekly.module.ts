import { Module } from '@nestjs/common';
import { WeeklyService } from './weekly.service';
import { WeeklyResolver } from './weekly.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { AppService } from '../app.service';
import { TasksService } from '../tasks/tasks.service';
import { TaskDaysService } from '../task-days/task-days.service';
import { CalendarService } from '../calendar/calendar.service';
import { DailyService } from '../daily/daily.service';

@Module({
  providers: [
    WeeklyService,
    WeeklyResolver,
    AppService,
    TasksService,
    TaskDaysService,
    CalendarService,
    DailyService,
  ],
  imports: [PrismaModule],
  exports: [WeeklyService],
})
export class WeeklyModule {}
