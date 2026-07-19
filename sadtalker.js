import { replicate } from "./replicate.js";

export async function generateTalkingVideo(imageUrl, audioUrl) {
  const output = await replicate.run(
    "cjwbw/sadtalker:latest",
    {
      input: {
        image: imageUrl,
        audio: audioUrl,
        preprocess: "crop",
        enhancer: "gfpgan",
        still: false
      }
    }
  );

  return output;
}
