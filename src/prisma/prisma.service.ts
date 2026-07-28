import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Membuka koneksi ke database saat aplikasi NestJS berjalan
    await this.$connect();
  }

  // Dipanggil otomatis ketika aplikasi NestJS dimatikan
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
