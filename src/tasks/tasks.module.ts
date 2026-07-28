import { Module } from '@nestjs/common';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  // Mendaftarkan Resolver agar dibaca oleh NestJS dan GraphQL
  providers: [TasksResolver, TasksService],
  imports: [PrismaModule],
  exports: [TasksService],
})
export class TasksModule {}
