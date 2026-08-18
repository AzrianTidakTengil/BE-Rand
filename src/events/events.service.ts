import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateEventInput } from './dto/update-event.input';
import { CreateEventInput } from './dto/create-event.input';
import { CalendarService } from '../calendar/calendar.service';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly calendarService: CalendarService,
  ) {}

  // Fungsi untuk membuat event
  async createMany(data: CreateEventInput[]) {
    const eventNames = data.map((event) => event.name);

    const existingEvents = await this.prisma.event.findMany({
      where: { name: { in: eventNames } },
      select: { name: true },
    });
    const existingNames = new Set(existingEvents.map((e) => e.name));

    const newEvents = data.filter((event) => !existingNames.has(event.name));

    if (newEvents.length === 0) {
      return {
        count: 0,
        message: 'All events already exist, no new data created.',
      };
    }

    const createManyPrisma = await this.prisma.event.createMany({
      data: newEvents,
      skipDuplicates: true,
    });

    const calendarEventPromises = newEvents.map(async (event) => {
      try {
        await this.calendarService.createEvent(
          event.name,
          event.startDate,
          event.endDate,
          3,
        );
      } catch (error) {
        console.error(
          `[Calendar Error] Failed to create event ${event.name}:`,
          error,
        );
      }
    });

    await Promise.allSettled(calendarEventPromises);

    return createManyPrisma;
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
