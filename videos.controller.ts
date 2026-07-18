import { Controller, Post, Body } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('generate')
  async generateVideo(@Body('prompt') prompt: string) {
    return this.videosService.generate(prompt);
  }
}
