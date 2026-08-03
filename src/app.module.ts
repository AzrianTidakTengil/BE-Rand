import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TasksModule } from './tasks/tasks.module';
import { EventsModule } from './events/events.module';
import { TaskDaysModule } from './task-days/task-days.module';
import { LogScheduleModule } from './log-schedule/log-schedule.module';
import { AppResolver } from './app.resolver';
import { CalendarService } from './calendar/calendar.service';
import { CalendarModule } from './calendar/calendar.module';
import { DailyResolver } from './daily/daily.resolver';
import { DailyModule } from './daily/daily.module';
import { WeeklyModule } from './weekly/weekly.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',

      // Jadikan global agar tidak perlu import ConfigModule di module lain
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
    }),
    TasksModule,
    EventsModule,
    TaskDaysModule,
    LogScheduleModule,
    CalendarModule,
    DailyModule,
    WeeklyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    AppResolver,
    CalendarService,
    DailyResolver,
  ],
  exports: [AppService],
})
export class AppModule {}
