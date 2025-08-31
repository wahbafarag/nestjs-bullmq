import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('my-bull-queue', {
  concurrency: 2, // number of concurrent jobs to process
}) // queue name
export class VideoWorker extends WorkerHost {
  async process(job: Job) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 5000);
    });
    throw new Error('Simulated job failure');
  }

  // adding event listeners for worker events
  @OnWorkerEvent('active') // when job starts processing
  onActive(job: Job) {
    console.log('Processing job:', job.id);
    console.log(`Job ${job.id} is now active; data:`, job.data);
  }

  @OnWorkerEvent('completed') // when job is completed
  onCompleted(job: Job) {
    console.log(`Job ${job.id} has completed`);
  }

  @OnWorkerEvent('failed') // when job fails
  onFailed(job: Job, err: Error) {
    console.log(`Job ${job.id} has failed with error: ${err.message}`);
    console.log(`Attempts made: ${job.attemptsMade}`);
  }
}
