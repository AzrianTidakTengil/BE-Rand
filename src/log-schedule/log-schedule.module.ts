import { Module } from '@nestjs/common';
import { LogScheduleService } from './log-schedule.service';
import { LogScheduleResolver } from './log-schedule.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [LogScheduleService, LogScheduleResolver],
  imports: [PrismaModule],
  exports: [LogScheduleService],
})
export class LogScheduleModule {}
