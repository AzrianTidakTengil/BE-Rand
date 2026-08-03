import { Module } from '@nestjs/common';
import { WeeklyService } from './weekly.service';
import { WeeklyResolver } from './weekly.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [WeeklyService, WeeklyResolver],
  imports: [PrismaModule],
})
export class WeeklyModule {}
