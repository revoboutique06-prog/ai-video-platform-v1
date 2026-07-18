import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Controller, Post, Body } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @UseGuards(AuthGuard)
  @Post('generate')
  async generateVideo(@Body('prompt') prompt: string) {
    return this.videosService.generate(prompt);
  }
}
