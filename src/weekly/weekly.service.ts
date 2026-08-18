import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeeklyInput } from './dto/create-weekly.input';
import { UpdateWeeklyInput } from './dto/update-weekly.input';

@Injectable()
export class WeeklyService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(data: CreateWeeklyInput[]) {
    return await this.prisma.weekly.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async findAll() {
    return this.prisma.weekly.findMany();
  }

  async findAllWhereDay() {
    return this.prisma.weekly.findMany({
      where: {
        day: new Date().getDay(),
      },
    });
  }

  async findUnique(id: number) {
    return this.prisma.weekly.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateWeeklyInput) {
    return this.prisma.weekly.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.weekly.deleteMany({
      where: {
        id,
      },
    });
  }
}
