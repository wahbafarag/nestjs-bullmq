import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // install bullmq
  // register bull module and specify redis connection
  // create a queue and a worker
  // send a job to the queue
}
