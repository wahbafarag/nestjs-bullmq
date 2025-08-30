import { Controller, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('video')
export class VideoController {
  constructor(
    @InjectQueue('my-bull-queue') private readonly videoQueue: Queue,
  ) {}

  @Post('process')
  async processVideo() {
    await this.videoQueue.add(
      'video-processing-job',
      {
        videoId: '12345',
        videoName: 'sample-video.mp4',
        videoPath: '/path/to/video.mp4',
        videoType: 'mp4',
      }, // job data
    );
    return { message: 'Video processed successfully' };
  }
}
