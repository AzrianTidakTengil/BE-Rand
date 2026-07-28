import { Injectable, Logger } from '@nestjs/common';
import { google, calendar_v3 } from 'googleapis';

@Injectable()
export class CalendarService {
  private readonly logger = new Logger(CalendarService.name);

  private calendar: calendar_v3.Calendar;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: './google-key.json',
      scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async createEvent(taskName: string, startTime: Date, endTime: Date) {
    try {
      const event: calendar_v3.Schema$Event = {
        summary: `Tugas: ${taskName}`,
        description: 'Dibuat otomatis oleh Aplikasi Jadwal Saya',
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'Asia/Jakarta',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'Asia/Jakarta',
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 0 },
            { method: 'popup', minutes: 10 },
          ],
        },
      };

      const response = await this.calendar.events.insert({
        calendarId: 'azrianawan@gmail.com',
        requestBody: event,
      });

      if (response.data?.htmlLink) {
        this.logger.log(`Jadwal masuk: ${response.data.htmlLink}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Gagal memasukkan jadwal: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(
          'Gagal memasukkan jadwal dengan error tidak dikenal',
          error,
        );
      }
    }
  }
}
