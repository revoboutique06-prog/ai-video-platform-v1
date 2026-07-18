import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { PrismaService } from '../prisma.service';

@Controller('auth')
export class ProfileController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const userId = req.user.id;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        createdAt: true
      }
    });

    return { success: true, user };
  }
}
