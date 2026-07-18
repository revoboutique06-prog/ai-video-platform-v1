import { UseGuards, Controller, Post, Body, Get, Query, Param, Delete } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  // توليد فيديو جديد
  @UseGuards(AuthGuard)
  @Post('generate')
  async generateVideo(@Body('prompt') prompt: string) {
    return this.videosService.generate(prompt);
  }

  // جلب كل الفيديوهات
  @UseGuards(AuthGuard)
  @Get()
  async getAllVideos() {
    return this.videosService.getAll();
  }

  // البحث داخل الفيديوهات
  @UseGuards(AuthGuard)
  @Get('search')
  async search(@Query('query') query: string) {
    return this.videosService.search(query);
  }

  // حذف فيديو (اختياري)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteVideo(@Param('id') id: string) {
    return this.videosService.delete(id);
  }
}
