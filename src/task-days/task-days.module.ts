import { Module } from '@nestjs/common';
import { TaskDaysService } from './task-days.service';
import { TaskDaysResolver } from './task-days.resolver';
import { PrismaModule } from '../prisma/prisma.module';
// import { AppModule } from '../app.module';
import { AppService } from '../app.service';
import { TasksService } from '../tasks/tasks.service';
import { CalendarModule } from '../calendar/calendar.module';

@Module({
  providers: [TaskDaysService, TaskDaysResolver, AppService, TasksService],
  imports: [PrismaModule, CalendarModule],
  exports: [TaskDaysService],
})
export class TaskDaysModule {}
