import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Wajib diekspor agar bisa di-import oleh module lain
})
export class PrismaModule {}
