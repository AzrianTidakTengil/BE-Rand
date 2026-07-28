import { Injectable } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';
import { TaskDaysService } from './task-days/task-days.service';
import { CalendarService } from './calendar/calendar.service';

@Injectable()
export class AppService {
  constructor(
    private readonly tasksService: TasksService,
    private readonly taskDaysService: TaskDaysService,
    private readonly calendarService: CalendarService,
  ) {}

  private formatHourToString = (hour: number) => {
    const format = hour.toString().padStart(2, '0') + ':00';
    return format;
  };

  // @Cron('* * * * *')
  // async handleReminder() {
  //   const schedule = await this.notionService.getDataSchedule();
  //   console.log(schedule);
  // }

  async generateRandomDailySchedule() {
    const tasks = await this.tasksService.findAll();

    if (tasks.length == 0) {
      return;
    }

    for (let i = tasks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tasks[i], tasks[j]] = [tasks[j], tasks[i]];
    }

    const today = new Date();
    let currentTime = new Date(today.setHours(8, 0, 0, 0));
    const endTimeLimit = new Date(today.setHours(17, 0, 0, 0));
    const newSchedules: {
      taskId: number;
      taskName: string;
      startTime: Date;
      endTime: Date;
    }[] = [];

    for (const task of tasks) {
      if (currentTime >= endTimeLimit) break;

      const nextTime = new Date(currentTime.getTime());
      nextTime.setHours(currentTime.getHours() + 1);

      const actualEndTime = nextTime > endTimeLimit ? endTimeLimit : nextTime;

      newSchedules.push({
        taskId: task.id,
        taskName: task.name,
        startTime: new Date(currentTime),
        endTime: new Date(actualEndTime),
      });

      currentTime = new Date(actualEndTime);
    }

    // 5. Simpan menggunakan fungsi dari TaskDaysService
    if (newSchedules.length > 0) {
      // 1. Filter data hanya yang dibutuhkan oleh Prisma (buang taskName)
      const prismaPayload = newSchedules.map(
        ({ taskId, startTime, endTime }) => ({
          taskId,
          startTime,
          endTime,
        }),
      );

      await this.taskDaysService.createMany(prismaPayload);

      const calendarPromises = newSchedules.map((schedule) =>
        this.calendarService.createEvent(
          schedule.taskName,
          schedule.startTime,
          schedule.endTime,
        ),
      );

      await Promise.allSettled(calendarPromises);
    }
  }
}
