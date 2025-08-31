import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';

@QueueEventsListener('my-bull-queue')
export class VideoQueueEventsListener extends QueueEventsHost {
  logger = new Logger('Queue');

  @OnQueueEvent('added')
  onAdded(job: { jobId: string; name: string }) {
    console.log(job);
    this.logger.log(`Job ${job.jobId} has been added to the queue ${job.name}`);
  }
}
