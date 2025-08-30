import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('my-bull-queue')
export class VideoWorker extends WorkerHost {
  async process(job: Job) {}
}
