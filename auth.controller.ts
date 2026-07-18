import { Controller, Post, Body, Req } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Post('login')
  async login(@Body() body, @Req() req) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return { success: false };
    }

    req.session.userId = user.id;

    return { success: true };
  }

  @Post('check')
  async check(@Req() req) {
    return { loggedIn: !!req.session.userId };
  }
}
