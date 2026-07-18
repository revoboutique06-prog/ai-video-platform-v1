import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class SignupController {
  constructor(private prisma: PrismaService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // التحقق إذا الإيميل موجود مسبقًا
    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { success: false, message: 'الإيميل مستخدم مسبقًا' };
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء المستخدم
    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    return { success: true, message: 'تم إنشاء الحساب بنجاح' };
  }
}
