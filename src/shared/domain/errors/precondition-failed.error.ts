import { HttpException, HttpStatus } from '@nestjs/common';

export class PreconditionFailedError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.PRECONDITION_FAILED);
    this.name = 'PreconditionFailedError';
  }
}
