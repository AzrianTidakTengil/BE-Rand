import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Sesuaikan path jika berbeda
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  // Fungsi untuk membuat task
  async createMany(data: CreateTaskInput[]) {
    return await this.prisma.task.createMany({
      data,
      skipDuplicates: true,
    });
  }

  // Fungsi untuk mengambil semua task
  async findAll() {
    return this.prisma.task.findMany();
  }

  // Fungsi untuk mengambil task berdasarkan Id
  async findUnique(id: number) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  // Fungsi untuk memperbarui task berdasarkan Id
  async update(id: number, data: UpdateTaskInput) {
    return this.prisma.task.update({
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
