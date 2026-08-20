import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDayInput } from './dto/create-task-day.input';
import { UpdateTaskDayInput } from './dto/update-task-day.input';

@Injectable()
export class TaskDaysService {
  constructor(private readonly prisma: PrismaService) {}

  // Fungsi untuk membuat taskDay
  async createMany(data: CreateTaskDayInput[]) {
    return await this.prisma.taskDay.createMany({
      data,
      skipDuplicates: true,
    });
  }

  // Fungsi untuk mengambil semua taskDay
  async findAll() {
    const getWibParts = (date = new Date()) => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      const parts = formatter.formatToParts(date);
      const val = parts.reduce(
        (acc, part) => {
          acc[part.type] = part.value;
          return acc;
        },
        {} as Record<string, string>,
      );

      return {
        year: parseInt(val.year),
        month: parseInt(val.month) - 1, // 0-indexed
        day: parseInt(val.day),
      };
    };

    const wib = getWibParts();

    // 2. Buat batas awal hari ini (Jam 00:00:00 WIB)
    // 00:00:00 WIB = 17:00:00 UTC hari sebelumnya
    const startOfDay = new Date(
      Date.UTC(wib.year, wib.month, wib.day, 0 - 7, 0, 0, 0),
    );

    // 3. Buat batas akhir hari ini (Jam 23:59:59.999 WIB)
    // 23:59:59.999 WIB = 16:59:59.999 UTC hari yang sama
    const endOfDay = new Date(
      Date.UTC(wib.year, wib.month, wib.day, 23 - 7, 59, 59, 999),
    );

    return this.prisma.taskDay.findMany({
      where: {
        // Asumsi kita menggunakan startTime sebagai patokan jadwal hari itu
        startTime: {
          gte: startOfDay, // gte: Greater Than or Equal (Lebih dari atau sama dengan awal hari)
          lte: endOfDay, // lte: Less Than or Equal (Kurang dari atau sama dengan akhir hari)
        },
      },
      include: {
        task: true,
      },
      orderBy: {
        startTime: 'asc',
      },
    });
  }

  // Fungsi untuk mengambil taskDay berdasarkan Id
  async findUnique(id: number) {
    return this.prisma.taskDay.findUnique({
      where: {
        id,
      },
      include: {
        task: true,
      },
    });
  }

  // Fungsi untuk memperbarui taskDay berdasarkan Id
  async update(id: number, data: UpdateTaskDayInput) {
    return this.prisma.taskDay.update({
      where: {
        id,
      },
      data,
    });
  }

  // Fungsi untuk menghapus task berdasarkan Id
  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
