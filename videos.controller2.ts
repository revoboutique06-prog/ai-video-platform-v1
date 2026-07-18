import { Controller, Post, Body, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('videos')
export class VideosController {
  constructor(private prisma: PrismaService) {}

  // توليد فيديو جديد
  @Post('create')
  async createVideo(@Body() body) {
    const { prompt } = body;

    if (!prompt) {
      return { success: false, message: "الرجاء كتابة وصف الفيديو" };
    }

    // ⚠️ هنا مكان API توليد الفيديو الحقيقي
    // الآن نضع رابط فيديو تجريبي فقط
    const fakeVideoUrl = "https://example.com/fake-video.mp4";

    // حفظ الفيديو في قاعدة البيانات
    const video = await this.prisma.video.create({
      data: {
        prompt,
        url: fakeVideoUrl
      }
    });

    return { success: true, video };
  }

  // جلب الفيديوهات
  @Get()
  async getVideos() {
    return await this.prisma.video.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }
}
