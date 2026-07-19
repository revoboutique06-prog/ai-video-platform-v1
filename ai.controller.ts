import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

@Controller('ai')
export class AiController {

  @Post('generate-video')
  @UseGuards(AuthGuard)
  async generateVideo(@Body() body: { script: string }) {

    const prompt = body.script;

    const response = await axios.post(
      "https://api.hailuoai.com/v1/video/generate",
      {
        prompt: prompt,
        duration: 5
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const videoUrl = response.data.video_url;

    const videoData = await axios.get(videoUrl, { responseType: "arraybuffer" });

    const fileName = `generated-${Date.now()}.mp4`;
    const filePath = path.join(__dirname, "..", "..", "uploads", fileName);

    fs.writeFileSync(filePath, videoData.data);

    return {
      success: true,
      url: `http://localhost:3000/uploads/${fileName}`
    };
  }
}
