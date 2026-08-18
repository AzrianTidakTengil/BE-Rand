import { Injectable, Logger } from '@nestjs/common';
import { google, calendar_v3 } from 'googleapis';

interface GoogleCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain?: string;
}

@Injectable()
export class CalendarService {
  private readonly logger = new Logger(CalendarService.name);

  private calendar: calendar_v3.Calendar;

  constructor() {
    const credentialsString = process.env.GOOGLE_CREDENTIALS_JSON;

    if (!credentialsString) {
      throw new Error(
        'FATAL ERROR: GOOGLE_CREDENTIALS_JSON tidak ditemukan di Environment Variables!',
      );
    }

    const parsedCredentials = JSON.parse(
      credentialsString,
    ) as GoogleCredentials;

    const auth = new google.auth.GoogleAuth({
      credentials: parsedCredentials,
      scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async createEvent(
    taskName: string,
    startTime: Date,
    endTime: Date,
    taskType?: number,
  ) {
    try {
      // Tentukan variasi tampilan berdasarkan tipe tugas
      const typeConfig = {
        0: {
          prefix: 'Tugas',
          colorId: '6',
          reminders: [{ method: 'popup', minutes: 10 }],
        },
        1: {
          prefix: 'Harian',
          colorId: '2',
          reminders: [{ method: 'popup', minutes: 30 }],
        },
        2: {
          prefix: 'Mingguan',
          colorId: '8',
          reminders: [{ method: 'popup', minutes: 30 }],
        },
        3: {
          prefix: 'Event',
          colorId: '4',
          reminders: [
            { method: 'email', minutes: 60 },
            { method: 'popup', minutes: 15 },
          ],
        },
      } as Record<
        number,
        {
          prefix: string;
          colorId: string;
          reminders: calendar_v3.Schema$EventReminder[];
        }
      >;

      const cfg =
        taskType !== undefined && typeConfig[taskType]
          ? typeConfig[taskType]
          : typeConfig[0];

      const event: calendar_v3.Schema$Event = {
        summary: `${cfg.prefix}: ${taskName}`,
        description: `Dibuat otomatis oleh Aplikasi Jadwal Saya — Tipe: ${cfg.prefix}`,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'Asia/Jakarta',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'Asia/Jakarta',
        },
        colorId: cfg.colorId,
        visibility: taskType === 3 ? 'public' : 'default',
        reminders: {
          useDefault: false,
          overrides: cfg.reminders,
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
