import { Controller, Post, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { PrismaService } from '../prisma.service';

@Controller('video')
export class UploadController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file) {
    if (!file) {
      return { success: false, message: 'لم يتم رفع أي ملف' };
    }

    // حفظ بيانات الفيديو داخل قاعدة البيانات
    const video = await this.prisma.video.create({
      data: {
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path
      }
    });

    return { success: true, message: 'تم رفع الفيديو بنجاح', video };
  }
}
