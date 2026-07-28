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
