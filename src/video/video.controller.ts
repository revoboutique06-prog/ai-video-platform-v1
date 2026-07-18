import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('video')
export class VideoController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllVideos() {
    const videos = await this.prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        filename: true,
        url: true,
        createdAt: true
      }
    });

    return {
      success: true,
      videos
    };
  }
}
