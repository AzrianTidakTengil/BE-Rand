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
    // 1. Tentukan tanggal hari ini
    const today = new Date();

    // 2. Buat batas awal hari ini (Jam 00:00:00)
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    // 3. Buat batas akhir hari ini (Jam 23:59:59)
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
      999,
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
