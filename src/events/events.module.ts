import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { CalendarService } from '../calendar/calendar.service';

@Module({
  providers: [EventsService, EventsResolver, CalendarService],
  imports: [PrismaModule],
  exports: [EventsService],
})
export class EventsModule {}
