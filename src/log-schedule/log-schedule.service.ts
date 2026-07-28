import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogScheduleInput } from './dto/create-log-schedule.input';

@Injectable()
export class LogScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  // Fungsi untuk membuat logSchedule
  async createMany(data: CreateLogScheduleInput[]) {
    return await this.prisma.logSchedule.createMany({
      data,
      skipDuplicates: true,
    });
  }

  // Fungsi untuk mengambil semua logSchedule
  async findAll() {
    return this.prisma.logSchedule.findMany();
  }

  // Fungsi untuk mengambil logSchedule berdasarkan Id
  async findUnique(id: number) {
    return this.prisma.logSchedule.findUnique({
      where: {
        id,
      },
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
