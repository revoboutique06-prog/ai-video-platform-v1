import { generateTalkingVideo } from "../sadtalker.js";
import Replicate from "replicate";

export default {
  async fetch(request) {
    const formData = await request.formData();
    const imageFile = formData.get("image");
    const text = formData.get("text");

    // 1) توليد صوت عربي من النص
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN
    });

    const audio = await replicate.run(
      "alefi/alefi-tts:latest",
      {
        input: {
          text: text,
          language: "ar"
        }
      }
    );

    const audioUrl = audio.audio;

    // 2) رفع الصورة إلى Replicate
    const imageUrl = await replicate.upload(imageFile);

    // 3) تشغيل SadTalker
    const video = await generateTalkingVideo(imageUrl, audioUrl);

    return new Response(JSON.stringify({ video }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
