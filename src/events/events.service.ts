import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateEventInput } from './dto/update-event.input';
import { CreateEventInput } from './dto/create-event.input';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  // Fungsi untuk membuat event
  async createMany(data: CreateEventInput[]) {
    return await this.prisma.event.createMany({
      data,
      skipDuplicates: true,
    });
  }

  // Fungsi untuk mengambil semua event
  async findAll() {
    return this.prisma.event.findMany();
  }

  // Fungsi untuk mengambil event berdasarkan Id
  async findUnique(id: number) {
    return this.prisma.event.findUnique({
      where: {
        id,
      },
    });
  }

  // Fungsi untuk memperbarui event berdasarkan Id
  async update(id: number, data: UpdateEventInput) {
    return this.prisma.event.update({
      where: {
        id,
      },
      data,
    });
  }

  // Fungsi untuk menghapus event berdasarkan Id
  async delete(id: number) {
    return this.prisma.event.delete({
      where: {
        id,
      },
    });
  }
}
