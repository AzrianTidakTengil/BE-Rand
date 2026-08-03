import { Module } from '@nestjs/common';
import { DailyService } from './daily.service';
import { DailyResolver } from './daily.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [DailyService, DailyResolver],
  imports: [PrismaModule],
})
export class DailyModule {}
