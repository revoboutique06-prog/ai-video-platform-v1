import { Delete, Param } from '@nestjs/common';

@Delete(':id')
async deleteVideo(@Param('id') id: string) {
  await this.prisma.video.delete({
    where: { id: Number(id) }
  });

  return { success: true };
}
