import { Module } from '@nestjs/common';
import { DailyService } from './daily.service';
import { DailyResolver } from './daily.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { AppService } from '../app.service';
import { TaskDaysService } from '../task-days/task-days.service';
import { TasksService } from '../tasks/tasks.service';
import { CalendarService } from '../calendar/calendar.service';
import { WeeklyService } from '../weekly/weekly.service';

@Module({
  providers: [
    DailyService,
    DailyResolver,
    AppService,
    TaskDaysService,
    TasksService,
    CalendarService,
    WeeklyService,
  ],
  imports: [PrismaModule],
  exports: [DailyService],
})
export class DailyModule {}
