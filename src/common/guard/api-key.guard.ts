import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express'; // Pastikan mengimpor Request dari express

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly logger = new Logger(ApiKeyGuard.name);

  canActivate(context: ExecutionContext): boolean {
    // 1. Tambahkan generic <Request> agar ESLint mengenali tipe objeknya
    const request = context.switchToHttp().getRequest<Request>();

    // 2. Beri tipe eksplisit karena headers bisa berupa string, string[], atau undefined
    const apiKey = request.headers['x-api-key'] as string | undefined;

    const secretKey = process.env.CRON_SECRET_KEY;

    if (!secretKey) {
      this.logger.error(
        'CRON_SECRET_KEY tidak ditemukan di environment variables!',
      );
      throw new UnauthorizedException('Konfigurasi server tidak lengkap.');
    }

    if (!apiKey || apiKey !== secretKey) {
      // 3. Beri fallback jika request.ip undefined untuk menghindari error runtime
      const ip = request.ip ?? 'IP Tidak Diketahui';
      this.logger.warn(`Upaya akses tidak sah ditolak dari IP: ${ip}`);

      throw new UnauthorizedException('Akses ditolak: API Key tidak valid');
    }

    return true;
  }
}
