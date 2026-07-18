import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getStats() {
    const usersCount = await this.prisma.user.count();
    const videosCount = await this.prisma.video.count();

    const latestUsers = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { email: true, createdAt: true }
    });

    const latestVideos = await this.prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { filename: true, createdAt: true }
    });

    return {
      success: true,
      stats: {
        usersCount,
        videosCount,
        latestUsers,
        latestVideos
      }
    };
  }
}
