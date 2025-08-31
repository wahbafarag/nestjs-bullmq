import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('my-bull-queue', {
  concurrency: 2, // number of concurrent jobs to process
}) // queue name
export class VideoWorker extends WorkerHost {
  async process(job: Job) {
    const totalSteps = 5;

    // this is how we handle multiple job types in a single worker
    switch (job.name) {
      case 'video-processing-job':
        console.log('Processing video job:', job.data);
        await this.simulateLongRunningTask(job, totalSteps);
        break;

      case 'video-compression-job':
        console.log('Compressing video job:', job.data);
        await this.simulateLongRunningTask(job, totalSteps);
        break;

      default:
        console.log('Unknown job type:', job.name);
        throw new Error('Unknown job type');
    }

    // Simulate a failure for demonstration purposes
    // throw new Error('Simulated job failure');
  }

  async simulateLongRunningTask(job: Job, totalSteps: number) {
    for (let step = 1; step <= totalSteps; step++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const progress = Math.round((step / totalSteps) * 100);
      await job.updateProgress(progress); // update job progress
    }
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

  @OnWorkerEvent('progress') // when job makes progress
  onProgress(job: Job, progress: number) {
    console.log(`Job ${job.id} progress: ${progress}%`);
  }
}
