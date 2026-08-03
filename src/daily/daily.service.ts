import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDailyInput } from './dto/create-daily.input';
import { UpdateDailyInput } from './dto/update-daily.input';

@Injectable()
export class DailyService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(data: CreateDailyInput[]) {
    return await this.prisma.daily.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async findAll() {
    return this.prisma.daily.findMany();
  }

  async findUnique(id: number) {
    return this.prisma.daily.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateDailyInput) {
    return this.prisma.daily.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.daily.deleteMany({
      where: {
        id,
      },
    });
  }
}
