import { Injectable } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';
import { TaskDaysService } from './task-days/task-days.service';
import { CalendarService } from './calendar/calendar.service';
import { WeeklyService } from './weekly/weekly.service';
import { DailyService } from './daily/daily.service';

@Injectable()
export class AppService {
  constructor(
    private readonly tasksService: TasksService,
    private readonly taskDaysService: TaskDaysService,
    private readonly calendarService: CalendarService,
    private readonly dailyService: DailyService,
    private readonly weeklyService: WeeklyService,
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
    const taskDays = await this.taskDaysService.findAll();
    const daily = await this.dailyService.findAll();
    const weekly = await this.weeklyService.findAll();
    const today = new Date();

    if (taskDays.length > 0) {
      return;
    }

    if (tasks.length == 0) {
      return;
    }

    for (let i = tasks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tasks[i], tasks[j]] = [tasks[j], tasks[i]];
    }

    // --- 1. NORMALISASI WAKTU DAILY & WEEKLY KE HARI INI ---
    // Sesuai prompt sebelumnya, kita ambil jamnya saja dari DB, tanggalnya pakai hari ini
    const normalizeToToday = (dbDate: Date) => {
      // 1. Buat copy tanggal hari ini
      const d = new Date(today);

      // 2. Dapatkan komponen waktu secara UTC, lalu konversi manual ke WIB (UTC+7)
      const wibHours = (dbDate.getUTCHours() + 7) % 24;
      const wibMinutes = dbDate.getUTCMinutes();
      const wibSeconds = dbDate.getUTCSeconds();

      // 3. Terapkan waktu WIB tersebut ke tanggal target,
      // Kita set menggunakan fungsi UTC dan mengurangi 7 jam lagi
      // agar saat disimpan, nilai absolutnya tetap benar secara universal
      d.setUTCHours(wibHours - 7, wibMinutes, wibSeconds, 0);

      return d;
    };

    // Gabungkan jadwal daily dan weekly ke dalam satu array jadwal "Fix"
    const fixedSchedules = [
      ...daily.map((d) => ({
        name: d.name,
        startTime: normalizeToToday(d.startTime),
        endTime: normalizeToToday(d.endTime),
      })),
      ...weekly.map((w) => ({
        name: w.name,
        startTime: normalizeToToday(w.startTime),
        endTime: normalizeToToday(w.endTime),
      })),
    ];

    // Urutkan jadwal fix dari waktu yang paling awal
    fixedSchedules.sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime(),
    );

    // --- 2. PENJADWALAN TASKS (MENGHINDARI TABRAKAN) ---
    let currentTime = new Date(today);
    // Set ke 01:00 UTC (Sama dengan 08:00 WIB)
    currentTime.setHours(1, 0, 0, 0);

    const endTimeLimit = new Date(today);
    // Set ke 10:00 UTC (Sama dengan 17:00 WIB)
    endTimeLimit.setHours(10, 0, 0, 0);

    const newSchedules: {
      taskId: number;
      taskName: string;
      startTime: Date;
      endTime: Date;
    }[] = [];

    let taskIndex = 0; // Index untuk menunjuk task yang sedang dicoba dipasang

    while (currentTime < endTimeLimit && taskIndex < tasks.length) {
      // a. Cek apakah currentTime menabrak jadwal tetap (daily/weekly)
      const overlappingSchedule = fixedSchedules.find(
        (fs) => currentTime >= fs.startTime && currentTime < fs.endTime,
      );

      if (overlappingSchedule) {
        // Jika tabrakan, lompat ke akhir waktu jadwal yang menabrak tersebut
        currentTime = new Date(overlappingSchedule.endTime);
        continue;
      }

      // b. Cari jadwal tetap berikutnya untuk tahu seberapa besar sisa waktu yang kosong
      const nextFixedSchedule = fixedSchedules.find(
        (fs) => fs.startTime > currentTime,
      );

      // Default: Task dialokasikan 1 jam
      let actualEndTime = new Date(currentTime);
      actualEndTime.setHours(currentTime.getHours() + 1);

      // Jangan lewat batas kerja 17:00
      if (actualEndTime > endTimeLimit) {
        actualEndTime = endTimeLimit;
      }

      // Jangan sampai menabrak jadwal tetap di depannya, potong waktunya jika menabrak
      if (nextFixedSchedule && actualEndTime > nextFixedSchedule.startTime) {
        actualEndTime = nextFixedSchedule.startTime;
      }

      // Jika ada gap (durasi lebih dari 0 menit), masukkan ke jadwal baru
      if (actualEndTime.getTime() > currentTime.getTime()) {
        const currentTask = tasks[taskIndex];

        newSchedules.push({
          taskId: currentTask.id,
          taskName: currentTask.name,
          startTime: new Date(currentTime),
          endTime: new Date(actualEndTime),
        });

        // Lanjut ke task berikutnya karena task ini sudah masuk
        taskIndex++;
      }

      // Majukan pointer waktu untuk iterasi selanjutnya
      currentTime = new Date(actualEndTime);
    }

    // --- 3. SIMPAN KE DATABASE & KALENDAR ---
    if (newSchedules.length > 0) {
      const prismaPayload = newSchedules.map(
        ({ taskId, startTime, endTime }) => ({
          taskId,
          startTime,
          endTime,
        }),
      );

      await this.taskDaysService.createMany(prismaPayload);

      const calendarSchedulePromises = newSchedules.map((schedule) =>
        this.calendarService.createEvent(
          schedule.taskName,
          schedule.startTime,
          schedule.endTime,
        ),
      );

      // Gunakan `fixedSchedules` karena tanggalnya sudah ditimpa menjadi hari ini
      const calendarFixedPromises = fixedSchedules.map((item) =>
        this.calendarService.createEvent(
          item.name,
          item.startTime,
          item.endTime,
        ),
      );

      // PERBAIKAN: Gunakan spread operator `...` di dalam array, bukan operator `&&`
      await Promise.allSettled([
        ...calendarSchedulePromises,
        ...calendarFixedPromises,
      ]);
    }
  }

  async getScheduleForToday() {
    const schedules = await this.taskDaysService.findAll();

    const taskDaily = await this.dailyService.findAll();

    const taskWeekly = await this.weeklyService.findAll();
    const filteredTaskWeekly = taskWeekly.filter((task) => {
      const taskDate = new Date().getDay();
      return task.day == taskDate;
    });
    return {
      daily: taskDaily,
      weekly: filteredTaskWeekly,
      schedule: schedules,
    };
  }
}
