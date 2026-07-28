import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [EventsService, EventsResolver],
  imports: [PrismaModule],
  exports: [EventsService],
})
export class EventsModule {}
