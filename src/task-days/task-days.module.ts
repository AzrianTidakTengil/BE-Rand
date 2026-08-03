import { Module } from '@nestjs/common';
import { TaskDaysService } from './task-days.service';
import { TaskDaysResolver } from './task-days.resolver';
import { PrismaModule } from '../prisma/prisma.module';
// import { AppModule } from '../app.module';
import { AppService } from '../app.service';
import { TasksService } from '../tasks/tasks.service';
import { CalendarModule } from '../calendar/calendar.module';
import { DailyService } from '../daily/daily.service';
import { WeeklyService } from '../weekly/weekly.service';

@Module({
  providers: [
    TaskDaysService,
    TaskDaysResolver,
    AppService,
    TasksService,
    DailyService,
    WeeklyService,
  ],
  imports: [PrismaModule, CalendarModule],
  exports: [TaskDaysService],
})
export class TaskDaysModule {}
