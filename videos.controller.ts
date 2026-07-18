import { Controller, Post, Body, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import fetch from 'node-fetch';

@Controller('videos')
export class VideosController {
  constructor(private prisma: PrismaService) {}

  @Post('create')
  async createVideo(@Body() body) {
    const { prompt } = body;

    if (!prompt) {
      return { success: false, message: "الرجاء كتابة وصف الفيديو" };
    }

    // إرسال الطلب إلى Hailuo AI
    const response = await fetch("https://api.hailuoai.com/v1/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        duration: 5
      })
    });

    const result = await response.json();

    // رابط الفيديو الحقيقي
    const videoUrl = result?.data?.video_url;

    if (!videoUrl) {
      return { success: false, message: "فشل توليد الفيديو من Hailuo AI" };
    }

    // حفظ الفيديو في قاعدة البيانات
    const video = await this.prisma.video.create({
      data: {
        prompt,
        url: videoUrl
      }
    });

    return { success: true, video };
  }

  @Get()
  async getVideos() {
    return await this.prisma.video.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }
}
