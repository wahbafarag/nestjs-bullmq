import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { BullModule } from '@nestjs/bullmq';
import { VideoWorker } from './video.worker';

@Module({
  imports: [
    // install bullmq
    // register bull module and specify redis connection
    // create a queue and a worker
    // send a job to the queue

    // redis insight
    // docker ps -a
    // docker run -d --name redis-server -p 6379:6379 redis
    // docker exec -it redis-server redis-cli

    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 1000,
        removeOnFail: 3000,
        backoff: 2000, // after failure, wait 2 seconds before retrying
      },
    }),

    BullModule.registerQueue({
      name: 'my-bull-queue', // one or more
    }),
  ],

  controllers: [VideoController],
  providers: [VideoWorker],
})
export class VideoModule {}
